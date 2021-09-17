const db = require('../models');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {
  generateAccessToken,
  sendAccessToken,
} = require('./tokenfunction/index');
const dotenv = require('dotenv');

dotenv.config();

function generateRandomCode(n) {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

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
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  updateUser: async (req, res) => {
    // 1. nickname, password, image를 클라이언트로부터 받아온다.
    const { nickname, password } = req.body;
    // 2. 클라이언트로 받아온 유저 정보를 Cookie를 이용해서 조회 후, User.update 로 수정한다.
    const userInfo = await User.findOne({
      attributes: ['socialType'],
      where: { id: req.userId },
      raw: true,
    });
    if (userInfo.socialType !== 'local') {
      await User.update(
        {
          nickname,
          image: req.file ? req.file.location : ''
        },
        { where: { id: req.userId } }
      );
    }
    console.log(userInfo);
    const hashed = await bcrypt.hash(password, 10);
    await User.update(
      {
        nickname,
        password: hashed,
        image: req.file ? req.file.location : ''
      },
      { where: { id: req.userId } }
    );
    // 3. 업데이트된 유저정보를 res에 담아서 클라이언트로 보내준다.
    const updateUserInfo = await User.findOne({
      attributes: ['id', 'email', 'nickname', 'socialType', 'isAdmin', 'image'],
      where: { id: req.userId },
      raw: true,
    });
    try {
      if (updateUserInfo) {
        return res.status(200).json({ data: updateUserInfo });
      }
    } catch (err) {
      console.log(err);
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
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  validateEmail: async (req, res) => {
    // 1. Email 을 클라이언트에서 받아온 후, DB에 저장되어있는지 확인.
    const { email } = req.body;
    const foundEmail = await User.findOne({ where: { email } });
    // 2. 저장되어있다면 오류메시지를 보내준다.
    try {
      if (foundEmail) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      // 3. 저장되어있지않으면 인증코드를 res에 담아서 클라이언트로 보내준다.
      const transporter = nodemailer.createTransport({
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
          user: process.env.MAILID,
          pass: process.env.MAILPW,
        },
      });
      const verificationCode = generateRandomCode(6);
      const mailOptions = {
        from: process.env.MAILID,
        to: req.body.email,
        subject: '[Keyplus] 인증번호가 도착했습니다.',
        text: `Keyplus 인증번호 : ${verificationCode}`,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        }
        res.send({ data: info });
      });
      return res
        .status(200)
        .json({ data: { verificationCode: verificationCode } });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  validateNickname: async (req, res) => {
    // 1. Nickname 을 클라이언트에서 받아온 후, DB에 저장되어있는지 확인.
    const { nickname } = req.body;
    const foundNickName = await User.findOne({ where: { nickname } });
    try {
      // 2. 저장되어있다면 오류메시지를 보내준다.
      if (foundNickName) {
        return res.status(409).json({ message: 'Nickname already exists' });
      }
      // 3. 저장되어있지않으면 OK 메시지
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
  checkToken: async (req, res) => {
    const token = generateAccessToken({ id: 1 });
    return sendAccessToken(res, token);
  },
};
