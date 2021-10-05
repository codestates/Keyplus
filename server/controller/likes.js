const db = require('../models');
const { Keyboard } = require('../models');

module.exports = {
  getLikeKeyboardLists: async (req, res) => {
    try {
      // 1. Cookie를 이용해서 특정 유저가 좋아요 누른 키보드 아이디를 조회한다.
      const userId = req.userId;
      const likeKeyboardInfo = []; // like 누른 keyboard의 정보를 넣음.

      let likeInfo = await db.sequelize.models.Likes.findAll({
        // Likes테이블에 있는 KeyboardId를 전부 가져온다.
        attributes: ['KeyboardId'],
        where: {
          UserId: userId,
        },
        raw: true,
      });
      likeInfo = likeInfo.map((el) => el.KeyboardId);

      for (let i = 0; i < likeInfo.length; i++) {
        const keyboardInfo = await db.Keyboard.findOne({
          where: {
            id: likeInfo[i],
          },
          raw: true,
        });
        likeKeyboardInfo.push(keyboardInfo);
      }
      // 2. 조회한 키보드 아이디로 키보드 정보를 찾은 후 그 정보를 클라이언트에 보내준다.
      return res.status(200).json({ data: likeKeyboardInfo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  addLikeKeyboardLists: async (req, res) => {
    try {
      const keyboardId = req.params.id;
      const userId = req.userId;
      // 1. params 로 키보드 아이디를 받아온다.
      // 2. Cookie 를 이용해 유저아이디도 조회한다.
      const likeInfo = await db.sequelize.models.Likes.findOne({
        // Likes테이블에 userId가 존재하는지.
        where: {
          UserId: userId,
          KeyboardId: keyboardId,
        },
      });
      if (likeInfo)
        return res.status(409).json({ message: '이미 좋아요를 누르셨습니다.' });
      /* 3. Likes DB에 params로 받아온 아이디와 Cookie를 이용해 조회한 유저아이디가 존재하지않는다면,
            Keyboard 테이블에 likeCount 컬럼을 1 증가시킨 후, Like 테이블에 키보드아이디와 유저아이디를 추가해준다. */

      await db.sequelize.models.Likes.create({
        UserId: userId,
        KeyboardId: keyboardId,
      });
      await Keyboard.increment(
        {
          likeCount: 1,
        },
        {
          where: {
            id: keyboardId,
          },
        }
      );

      const keyboardInfo = await Keyboard.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        where: {
          id: keyboardId,
        },
      });

      return res.status(200).json({ data: keyboardInfo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  deleteLikeKeyboardLists: async (req, res) => {
    // 1. params 로 키보드 아이디를 받아온다.
    try {
      const keyboardId = req.params.id;
      const userId = req.userId;
      const likeInfo = await db.sequelize.models.Likes.findOne({
        // Likes테이블에 userId가 존재하는지.
        where: {
          UserId: userId,
          KeyboardId: keyboardId,
        },
      });
      if (!likeInfo)
        return res
          .status(409)
          .json({ message: '좋아요를 누르지 않으셨습니다.' });
      /* 2. Likes DB에 params로 받아온 아이디와 Cookie를 이용해 조회한 유저아이디가 존재한다면,
            Keyboard 테이블에 likeCount 컬럼을 1 감소시킨 후, Like 테이블에 키보드아이디와 유저아이디를 삭제해준다. */

      await db.sequelize.models.Likes.destroy({
        where: {
          UserId: userId,
          KeyboardId: keyboardId,
        },
      });
      await Keyboard.decrement(
        {
          likeCount: 1,
        },
        {
          where: {
            id: keyboardId,
          },
        }
      );
      return res.status(200).json({ message: 'ok' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
};
