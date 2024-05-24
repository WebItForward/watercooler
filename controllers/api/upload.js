const s3 = require("../../config/aws");
const { v4: uuidv4 } = require("uuid");
const User = require("../../models/user");

module.exports = {
  uploadAvatar,
  getAvatarUrl,
};

async function uploadAvatar(req, res) {
  const file = req.file;
  const fileName = `${uuidv4()}_${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // Ensure the object is public
  };

  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    // Delete the previous photo if it exists
    if (user.photoUrl) {
      const previousPhotoKey = user.photoUrl.split(".com/")[1];
      await s3
        .deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: previousPhotoKey,
        })
        .promise();
    }

    // Upload the new photo
    const data = await s3.upload(params).promise();
    const photoUrl = data.Location;

    // Update the user's photoUrl in the database
    await User.findByIdAndUpdate(userId, { photoUrl });

    res.status(200).json({ url: photoUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAvatarUrl(req, res) {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user || !user.photoUrl) {
      return res.status(404).json({ error: "No photo found" });
    }

    res.status(200).json({ url: user.photoUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
