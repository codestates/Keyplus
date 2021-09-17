const db = require('../models');
const { User, Keyboard, Review } = require('../models');
const { Op } = require('sequelize');

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
  getFilteredKeyboards: async (req, res) => {
    try {
      const { color, backlight, tenkey, bluetooth, price } = req.body;
      const keys = { '저소음적축': 1, '적축': 1, '갈축': 2, '흑축': 3, '청축': 4 };
      let getSwitch = {}; 
      for (let key in keys) {  // 반복문을 돌려 req.body.switch를 getKeys에 넣는다.
        if (keys[key] === req.body.switch) {
          getSwitch[key] = true;
        }
      };

      const fliteredKeyboards = await Keyboard.findAll({
        where: {
          switch: {
            [Op.or]: getSwitch,
          },
          color: color,
          backlight: backlight,
          tenkey: tenkey,
          bluetooth: bluetooth,
          price: {
            [Op.lte]: price,
          },
        },
        raw: true,
      });
      return res.status(200).json({ data: fliteredKeyboards });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  },
  getKeyboardsById: async (req, res) => {
    try {
      // 1. params 로 keyboardId를 받아온다.
      const keyboard = req.params.id;
      // 2. 바아온 아이디로 특정 키보드를 조회한 후 클라이언트로 보내준다.
      const getKeyboard = await Keyboard.findOne({
        where: {
          id: keyboard,
        },
        raw: true,
      });
      const keyboardReview = await Review.findAll({
        where: {
          keyboardId: keyboard,
        },
        raw: true,
      });
      const reviewUserId = keyboardReview.map((el) => el.userId); // userId를 배열로 만든다.

      let reviews = [];  // review에 user.nickname을 넣어 reviews에 저장한다.
      let reviewCount = 0;
      for (let i = 0; i < reviewUserId.length; i++) { 
        reviewCount++
        let getNickname = await User.findOne({
          attributes: [ 'nickname', 'image' ],
          where: {
            id: reviewUserId[i],
          },
          raw: true,
        });
        getNickname[ 'userImage' ] = getNickname[ 'image' ];
        delete getNickname[ 'image' ];
        Object.assign(keyboardReview[i], getNickname);
      };
      reviews = { reviews: keyboardReview };
      let getKeyboardReview = Object.assign(getKeyboard, { reviewCount }, reviews);  // 키보드에 리뷰를 붙인다.
      return res.status(200).json({ data: getKeyboardReview });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message : "Server Error" });
    }
  },
};
