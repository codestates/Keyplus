const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWSKEYID,
  secretAccessKey: process.env.AWSSECRETKEY,
  region: process.env.AWSREGION,
});

const storage = multerS3({
  s3: s3,
  bucket: 'keyplus-s3-image',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    if (req.files) {
      cb(null, `review/${Date.now()}_${file.originalname}`);
    } else cb(null, `profile/${Date.now()}_${file.originalname}`);
  },
});

exports.uploads = multer({ storage: storage });
