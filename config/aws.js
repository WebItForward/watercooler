const AWS = require("aws-sdk");

AWS.config.update({ logger: console });

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.AWS_REGION,
});

module.exports = s3;
