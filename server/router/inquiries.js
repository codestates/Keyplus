const express = require('express');
const inquiriesController = require('../controller/inquiries');

const router = express.Router();

router.post('/', inquiriesController.sendInquiry); // 문의 메일 전송

module.exports = router;
