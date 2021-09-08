const express = require('express');
const usersController = require('../controller/users');
const isAuth = require('../middleware/auth');

const router = express.Router();

router.post('/login', usersController.login); // login API
router.post('/logout', isAuth, usersController.logout); // logout API
router.post('/signup', usersController.signup); // singup API
router.get('/', isAuth, usersController.getUser); // mypage 회원정보 조회
router.patch('/', isAuth, usersController.updateUser); // 회원정보수정
router.delete('/', isAuth, usersController.deleteUser); // 회원탈퇴
router.get('/google', usersController.googleLogin); // 구글 오어스
router.get('/naver', usersController.naverLogin); // 네이버 오어스
router.get('/kakao', usersController.kakaoLogin); // 카카오 오어스
router.post('/email', usersController.validateEmail); // email 중복검사 및 인증번호전송
router.post('/nickname', usersController.validateNickname); // nickname 중복검사
router.get('/checkToken', usersController.checkToken);

module.exports = router;
