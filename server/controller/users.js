const db = require('../models');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
  generateAccessToken,
  sendAccessToken,
} = require('./tokenfunction/index');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  getUser: async (req, res) => {
    // 1. Cookie 를 이용해서 ( req.userId ) 유저정보를 가져온다.
    const userInfo = await User.findOne({
      attributes: ['id', 'email', 'nickname', 'socialType', 'isAdmin', 'image'],
      where: { id: req.userId },
      raw: true,
    });
    // 2. 가져온 유저정보를 res에 담아서 클라이언트로 보내준다.
    try {
      if (userInfo) {
        return res.status(200).json({ data: userInfo });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  updateUser: async (req, res) => {
    // 1. nickname, password, image를 클라이언트로부터 받아온다.
    const { nickname, password, image } = req.body;
    // 2. 클라이언트로 받아온 유저 정보를 Cookie를 이용해서 조회 후, User.update 로 수정한다.
    try {
      const userInfo = await User.findOne({
        attributes: ['id', 'email', 'nickname', 'socialType', 'image'],
        where: { id: req.userId },
        raw: true,
      });

      if (req.file) {
        userInfo.image = req.file.location;
      }

      if (userInfo.socialType !== 'local') {
        await User.update(
          {
            nickname,
            image: userInfo.image,
          },
          { where: { id: req.userId } }
        );
      } else {
        const hashed = await bcrypt.hash(password, 10);
        await User.update(
          {
            nickname,
            password: hashed,
            image: userInfo.image,
          },
          { where: { id: req.userId } }
        );
      }
      // 3. 업데이트된 유저정보를 res에 담아서 클라이언트로 보내준다.
      const updateUserInfo = await User.findOne({
        attributes: [
          'id',
          'email',
          'nickname',
          'socialType',
          'isAdmin',
          'image',
        ],
        where: { id: req.userId },
        raw: true,
      });

      if (updateUserInfo) {
        return res.status(200).json({ data: updateUserInfo });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
    // 4. 중요한점은 비밀번호 수정 시 hashing 해줄 것
  },
  deleteUser: async (req, res) => {
    // 1. Cookie 를 이용해서 유저정보를 조회한 후, User.destroy 로 해당 DB를 삭제해준다.
    try {
      await User.destroy({ where: { id: req.userId } });
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({ message: 'Server Error' });
    }
  },

  checkToken: async (req, res) => {
    const token = generateAccessToken({ id: 1 });
    return sendAccessToken(res, token);
  },
};
