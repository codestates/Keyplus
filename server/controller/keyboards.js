const db = require('../models');
const { User, Keyboard } = require('../models');

module.exports = {
  getAllKeyboards: async (req, res) => {
    // 1. 업로드되어있는 모든 키보드를 조회해서 클라이언트로 보내준다. ( findAll )
  },
  getKeyboardsById: async (req, res) => {
    // 1. params 로 아이디를 받아온다.
    // 2. 바아온 아이디로 특정 키보드를 조회한 후 클라이언트로 보내준다.
  },
};
