const db = require('../models');
const { User, Keyboard } = require('../models');

module.exports = {
  getLikeKeyboardLists: async (req, res) => {
    try {
      // 1. Cookie를 이용해서 특정 유저가 좋아요 누른 키보드 아이디를 조회한다.
      const user = req.userId;
      let result = []; // like 누른 keyboard의 정보를 넣음.

      let like = await db.sequelize.models.Likes.findAll({  // Likes테이블에 있는 KeyboardId를 전부 가져온다.
        attributes: [ "KeyboardId" ],
        where: {
          UserId: user,
        },
        raw: true,
      });
      like = like.map((el) => el.KeyboardId);
      
      for (let i = 0; i < like.length; i++) {
        let getKeyboard = await db.Keyboard.findOne({
          where: {
            id: like[i],
          },
          raw: true,
        });
        result.push(getKeyboard);
      };
      // 2. 조회한 키보드 아이디로 키보드 정보를 찾은 후 그 정보를 클라이언트에 보내준다.
      return res.status(200).json({ data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  updateLikeKeyboardLists: async (req, res) => {
    try {
      // 1. params 로 키보드 아이디를 받아온다.
      const keyboard = req.params.id;
      // 2. Cookie 를 이용해 유저아이디도 조회한다.
      const user = req.userId;
      const keyboardLike = await db.sequelize.models.Likes.findOne({  // Likes테이블에 userId가 존재하는지.
        where: {
          UserId: user,
          KeyboardId: keyboard,
        },
      })
      /* 3. Likes DB에 params로 받아온 아이디와 Cookie를 이용해 조회한 유저아이디가 존재하지않는다면,
            Keyboard 테이블에 likeCount 컬럼을 1 증가시킨 후, Like 테이블에 키보드아이디와 유저아이디를 추가해준다. */
      if (!keyboardLike) {
        await db.sequelize.models.Likes.create({
          UserId: user,
          KeyboardId: keyboard,
        });
        await Keyboard.increment({
          likeCount: 1
        }, { 
          where: {
            id: keyboard,
          },
        });
        return res.status(200).json({ message: "OK" });
      } else {
        /* 4. Likes DB에 params로 받아온 아이디와 Cookie를 이용해 조회한 유저아이디가 존재한다면,
              Keyboard 테이블에 likeCount 컬럼을 1 감소시킨 후, Like 테이블에 키보드아이디와 유저아이디를 삭제해준다. */
        await db.sequelize.models.Likes.destroy({
          where: {
            UserId: user,
            KeyboardId: keyboard,
          },
        });
        await Keyboard.decrement({
          likeCount: 1
        }, { 
          where: {
            id: keyboard,
          },
        });
        return res.status(200).json({ message: "OK" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};