const express = require('express');
const { uploads } = require('../middleware/uploads');
const adminController = require('../controller/admin.js');
const isAuth = require('../middleware/verifyToken');
const imageUpload = uploads.fields([{ name: 'keyboardImg', maxCount: 5 }]);

const router = express.Router();

router.post('/addKeyboard', isAuth, imageUpload, adminController.addKeyboard); // admin 키보드 추가
router.patch(
  '/updateKeyboard/:id',
  isAuth,
  imageUpload,
  adminController.updateKeyboard
);
router.delete('/deleteKeyboard/:id', isAuth, adminController.deleteKeyboard);

module.exports = router;
