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
      const getKeyboard = await Keyboard.findOne({
        where: {
          id: keyboard
        },
        raw: true,
      });
      const keyboardReview = await Review.findAll({
        where: {
          keyboardId: keyboard,
        },
        raw: true,
      });
      const reviewUserId = keyboardReview.map((el) => el.userId) // userId를 배열로 만든다.

      let reviews = [];  // review에 user.nickname을 넣어 reviews에 저장한다.
      for (let i = 0; i < reviewUserId.length; i++) { 
        let getNickname = await User.findOne({
          attributes: [ 'nickname' ],
          where: {
            id: reviewUserId[i]
          },
          raw: true,
        })
        Object.assign(keyboardReview[i], getNickname);
      }
      reviews = { reviews: keyboardReview }
      let getKeyboardReview = Object.assign(getKeyboard, reviews);  // 키보드에 리뷰를 붙인다.
      return res.status(200).json({ data: getKeyboardReview })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message : "Server Error" });
    }
  },
};
