const express = require('express');
const reviewsController = require('../controller/reviews');
const isAuth = require('../middleware/verifyToken');

const router = express.Router();

router.get('/:id', reviewsController.getReviewsByKeyboardId); // 키보드별 리뷰 리스트 ( params로 들어오는 id 는 키보드의 id)
router.post('/:id', isAuth, reviewsController.addReview); // 키보드별 리뷰 작성  ( params로 들어오는 id 는 키보드의 id)
router.patch('/:id', isAuth, reviewsController.updateReview); // 리뷰 수정 ( params로 들어오는 id 는 키보드의 id)
router.delete('/:id', isAuth, reviewsController.deleteReview); // 리뷰 삭제 ( params로 들어오는 id 는 키보드의 id)
router.get('/', isAuth, reviewsController.getReviewLists); // 로그인한 유저가 추가한 리뷰 리스트(마이페이지 조회)

module.exports = router;
