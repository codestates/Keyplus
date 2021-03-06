const express = require('express');
const authController = require('../controller/auth');
const isAuth = require('../middleware/verifyToken');
const { uploads } = require('../middleware/uploads');

const router = express.Router();

router.post('/login', authController.login); // login API
router.post('/logout', isAuth, authController.logout); // logout API
router.post('/signup', uploads.single('img'), authController.signup); // singup API
router.get('/google', authController.googleLogin); // 구글 오어스
router.get('/googleCallback', authController.googleCallback);
router.get('/naver', authController.naverLogin); // 네이버 오어스
router.get('/naverCallback', authController.naverCallback);
router.get('/kakao', authController.kakaoLogin); // 카카오 오어스
router.get('/kakaoCallback', authController.kakaoCallback);
router.post('/email', authController.validateEmail); // email 중복검사 및 인증번호전송
router.post('/nickname', authController.validateNickname); // nickname 중복검사

module.exports = router;
