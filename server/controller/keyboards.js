const db = require('../models');
const { User, Keyboard, Review } = require('../models');

module.exports = {
  getAllKeyboards: async (req, res) => {
    // 1. 업로드되어있는 모든 키보드를 조회해서 클라이언트로 보내준다. ( findAll )
    try {
      const getAllKeyboard = await Keyboard.findAll({
        raw: true,
      });
      return res.status(200).json({ data: getAllKeyboard });
    } catch (error) {
      return res.status(500).json({ message : "Server Error" });
    };
  },
  getKeyboardsById: async (req, res) => {
    try {
      // 1. params 로 keyboardId를 받아온다.
      const keyboard = req.params.id
      // 2. 바아온 아이디로 특정 키보드를 조회한 후 클라이언트로 보내준다.
      const getKeyboardId = await Keyboard.findOne({
        where: {
          id: keyboard
        },
        raw: true,
      });
      // console.log(getKeyboardId)
      const keyboardReview = await Review.findAll({
        where: {
          keyboardId: keyboard,
        },
        raw: true,
      });
      const review = { reviews : keyboardReview };
      const result = Object.assign(getKeyboardId, review);
      return res.status(200).json({ data: result });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message : "Server Error" });
    }
  },
};
