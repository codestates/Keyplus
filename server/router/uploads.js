const express = require('express');
const uploadsController = require('../controller/uploads');
const { uploads } = require('../middleware/uploads');

const router = express.Router();

router.post('/uploadOne', uploads.single('img'), uploadsController.uploadOne);
router.post(
  '/uploadArray',
  uploads.fields([
    {
      name: 'video',
      maxCount: 1,
    },
    { name: 'img', maxCount: 5 },
  ]),
  uploadsController.uploadArray
);

module.exports = router;
