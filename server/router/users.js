const express = require('express');
const usersController = require('../controller/users');
const isAuth = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', isAuth, usersController.getUser); // mypage 회원정보 조회
router.patch('/', isAuth, usersController.updateUser); // 회원정보수정
router.delete('/', isAuth, usersController.deleteUser); // 회원탈퇴
router.post('/email', usersController.validateEmail); // email 중복검사 및 인증번호전송
router.post('/nickname', usersController.validateNickname); // nickname 중복검사
router.get('/checkToken', usersController.checkToken); // 토큰체크

module.exports = router;
