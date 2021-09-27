const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    if (file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      cb(null, `reviewVideo/${Date.now()}_${file.originalname}`);
<<<<<<< HEAD
    } else if (req.files && req.files.keyboardImg) {
      cb(null, `keyboards/${Date.now()}_${file.originalname}`);
    } else if (req.files && req.files.img1) {
=======
    } else if (req.files?.keyboardImg) {
      cb(null, `keyboard/${file.originalname}`);
    } else if (req.files?.img1) {
>>>>>>> 16f5560245a21efcf8a7712f3ff02d8a13d6c2ef
      cb(null, `review/${Date.now()}_${file.originalname}`);
    } else if (req.files && req.files.img2) {
      cb(null, `review/${Date.now()}_${file.originalname}`);
    } else if (req.files && req.files.img3) {
      cb(null, `review/${Date.now()}_${file.originalname}`);
    } else {
      cb(null, `profile/${Date.now()}_${file.originalname}`);
    }
  },
});

exports.uploads = multer({ storage: storage });
