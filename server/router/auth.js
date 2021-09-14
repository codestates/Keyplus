const express = require('express');
const authController = require('../controller/auth');
const isAuth = require('../middleware/verifyToken');
const { uploads } = require('../middleware/uploads');

const router = express.Router();

router.post('/login', authController.login); // login API
router.post('/logout', isAuth, authController.logout); // logout API
router.post('/signup', uploads.single('img'), authController.signup); // singup API
router.post('/google', authController.googleLogin); // 구글 오어스
router.post('/naver', authController.naverLogin); // 네이버 오어스
router.post('/kakao', authController.kakaoLogin); // 카카오 오어스

module.exports = router;
