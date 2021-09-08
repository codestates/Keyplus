const express = require('express');
const shopsController = require('../controller/shops');

const router = express.Router();

router.get('/', shopsController.getAllShops); // 타건샵 위치 지도로 표시

module.exports = router;
