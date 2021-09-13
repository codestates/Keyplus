const db = require('../models');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  sendAccessToken,
} = require('./tokenfunction/index');

module.exports = {
  login: async (req, res) => {
    // 1. email과 password 를 클라이언트에서 받아온다.
    const { email, password } = req.body;
    // 2. User 테이블에서 유저정보를 찾는다
    const userInfo = await User.findOne({ where: { email } });
    try {
      // 3. 유저정보가 없거나, 비밀번호가 틀릴경우 401 코드와 함께 오류 메시지를 보내준다.
      if (
        !userInfo ||
        !bcrypt.compareSync(password, userInfo.dataValues.password)
      ) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      // 4. 유저정보가 있으면 유저 테이블에서 정보를가져와서 res에 담아서 토큰과함께 클라이언트로 보내준다.
      const loginUserInfo = await User.findOne({
        attributes: [
          'id',
          'email',
          'nickname',
          'socialType',
          'isAdmin',
          'image',
        ],
        where: { email },
        raw: true,
      });
      const { id, userEmail, nickname, socialType, isAdmin, image } =
        loginUserInfo;
      const token = generateAccessToken({
        id,
        userEmail,
        nickname,
        socialType,
        isAdmin,
        image,
      });
      return res.status(200).cookie('jwt', token).json({ data: loginUserInfo });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  logout: async (req, res) => {
    // 1. clearCookie
    try {
      res.clearCookie('jwt');
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  signup: async (req, res) => {
    // 1. email, nickname, password, image 를 클라이언트에서 받아온다.
    const { email, nickname, password, image } = req.body;
    // 2. 패스워드를 hashing 해준 후 DB에 저장한다.
    // 3. User.create 를 사용해서 유저정보를 DB에 저장한다.
    try {
      const hashed = await bcrypt.hash(password, 10);
      await User.create({
        email,
        nickname,
        password: hashed,
        socialType: 'local',
        isAdmin: false,
        image,
      });
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  googleLogin: async (req, res) => {},
  naverLogin: async (req, res) => {},
  kakaoLogin: async (req, res) => {},
};
