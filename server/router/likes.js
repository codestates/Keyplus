const express = require('express');
const likesController = require('../controller/likes');
const isAuth = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', isAuth, likesController.getLikeKeyboardLists); // 좋아요 누른 키보드 리스트 조회
router.post('/:id', isAuth, likesController.addLikeKeyboardLists); // 관심목록(마이페이지 조회)에 있는 좋아요 누른 키보드 리스트 추가 or 삭제
router.delete('/:id', isAuth, likesController.deleteLikeKeyboardLists); // 관심목록(마이페이지 조회)에 있는 좋아요 누른 키보드 리스트 삭제

module.exports = router;
