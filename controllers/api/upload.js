const AWS = require("aws-sdk");
const Busboy = require("busboy");
const s3 = require("../../config/aws");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  uploadAvatar,
};

async function uploadAvatar(req, res) {
  const file = req.file;
  const fileName = `${uuidv4()}_${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    res.status(200).json({ url: data.Location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
