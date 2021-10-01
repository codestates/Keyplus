const express = require('express');
const keyboardsController = require('../controller/keyboards');

const router = express.Router();

router.get('/', keyboardsController.getAllKeyboards); // 모든 키보드리스트 조회
router.post('/filter', keyboardsController.getFilteredKeyboards); // 필터는 통한 키보드 조회
router.get('/:id', keyboardsController.getKeyboardsById); // 특정 키보드 상세페이지 조회

module.exports = router;
