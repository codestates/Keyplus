const db = require('../models');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const axios = require('axios');
const nodemailer = require('nodemailer');
dotenv.config();

const {
  generateAccessToken,
  sendAccessToken,
} = require('./tokenfunction/index');

function generateRandomCode(n) {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

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
    console.log(req.file);
    // 1. email, nickname, password, image 를 클라이언트에서 받아온다.
    const { email, nickname, password } = req.body;

    // 2. 패스워드를 hashing 해준 후 DB에 저장한다.
    // 3. User.create 를 사용해서 유저정보를 DB에 저장한다.
    try {
      if (req.file) {
        const hashed = await bcrypt.hash(password, 10);
        await User.create({
          email,
          nickname,
          password: hashed,
          socialType: 'local',
          isAdmin: false,
          image: req.file.location,
        });
        return res.status(200).json({ image: req.file.location });
      }
      const hashed = await bcrypt.hash(password, 10);
      await User.create({
        email,
        nickname,
        password: hashed,
        socialType: 'local',
        isAdmin: false,
        image: '',
      });
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
  googleLogin: async (req, res) => {
    return res.redirect(
      // 구글 로그인 화면 리다이렉트
      `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&client_id=${process.env.GOOGLE_CLIENT_ID}`
    );
  },
  googleCallback: async (req, res) => {
    const code = req.query.code; // authorization code
    try {
      const result = await axios.post(
        // authorization code를 이용해서 access token 요청
        `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
      );
      const userInfo = await axios.get(
        // access token으로 유저정보 요청

        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`,
          },
        }
      );
      // console.log(userInfo);
      //받아온 유저정보로 findOrCreate
      const user = await User.findOrCreate({
        where: {
          email: userInfo.data.email,
          socialType: 'google',
        },
        defaults: {
          email: userInfo.data.email, // 구글에서 받아온 유저정보의 이메일
          nickname: userInfo.data.name, // 구글에서 받아온 유저정보의 이름
          password: '',
          socialType: 'google',
          isAdmin: false,
          image: userInfo.data.picture,
        },
      });

      const token = generateAccessToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
        nickname: user[0].dataValues.nickname,
        socialType: user[0].dataValues.socialType,
        isAdmin: user[0].dataValues.isAdmin,
        image: user[0].dataValues.image,
      });
      console.log('====================token', token);

      res.cookie('jwt', token, {
        sameSite: 'None',
        httpOnly: true,
        secure: true,
      });

      res.redirect(`${process.env.CLIENT_URI}/temp`);
    } catch (error) {
      res.sendStatus(500);
    }
  },
  naverLogin: async (req, res) => {
    return res.redirect(
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${process.env.NAVER_REDIRECT_URI}`
    );
  },
  naverCallback: async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    console.log('===================CODE', code);
    console.log('===================STATE', state);
    try {
      const result = await axios.post(
        // authorization code를 이용해서 access token 요청
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`
      );

      const userInfo = await axios.get(
        // access token로 유저정보 요청
        'https://openapi.naver.com/v1/nid/me',
        {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`,
          },
        }
      );
      //받아온 유저정보로 findOrCreate
      const user = await User.findOrCreate({
        where: {
          email: userInfo.data.response.email,
          socialType: 'naver',
        },
        defaults: {
          email: userInfo.data.response.email, // 구글에서 받아온 유저정보의 이메일
          nickname: userInfo.data.response.name, // 구글에서 받아온 유저정보의 이름
          password: '',
          socialType: 'naver',
          isAdmin: false,
          image: '',
        },
      });
      const token = generateAccessToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
        nickname: user[0].dataValues.nickname,
        socialType: user[0].dataValues.socialType,
        isAdmin: user[0].dataValues.isAdmin,
        image: user[0].dataValues.image,
      });

      res.cookie('jwt', token, {
        sameSite: 'None',
        httpOnly: true,
        secure: true,
      });

      res.redirect(`${process.env.CLIENT_URI}/temp`);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  kakaoLogin: async (req, res) => {
    return res.redirect(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&&response_type=code`
    );
  },
  kakaoCallback: async (req, res) => {
    console.log(process.env.KAKAO_CLIENT_ID);
    console.log(process.env.KAKAO_REDIRECT_URI);
    const code = req.query.code;
    console.log('===================CODE', code);
    try {
      const result = await axios.post(
        // authorization code를 이용해서 access token 요청
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`
      );
      console.log('========result', result);
      const userInfo = await axios.get(
        // access token로 유저정보 요청
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`,
          },
        }
      );
      console.log('============USERINFO', userInfo);
      //받아온 유저정보로 findOrCreate
      const user = await User.findOrCreate({
        where: {
          email: userInfo.data.kakao_account.email,
          socialType: 'kakao',
        },
        defaults: {
          email: userInfo.data.kakao_account.email,
          nickname: userInfo.data.properties.nickname,
          password: '',
          socialType: 'kakao',
          isAdmin: false,
          image: userInfo.data.kakao_account.profile.profile_image_url,
        },
      });
      const token = generateAccessToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
        nickname: user[0].dataValues.nickname,
        socialType: user[0].dataValues.socialType,
        isAdmin: user[0].dataValues.isAdmin,
        image: user[0].dataValues.image,
      });

      res.cookie('jwt', token, {
        sameSite: 'None',
        httpOnly: true,
        secure: true,
      });

      res.redirect(`${process.env.CLIENT_URI}/temp`);
    } catch (error) {
      console.error(error);
      console.log('hihihihihi');
      res.sendStatus(500);
      console.log('hihihihihi');
    }
  },
  validateEmail: async (req, res) => {
    // 1. Email 을 클라이언트에서 받아온 후, DB에 저장되어있는지 확인.
    console.log('🌱🌱🌱🌱🌱', req.body);
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
      const logo =
        'https://cdn.discordapp.com/attachments/885407447479631876/894181145791586344/KEYPLUS_black_36.png';
      const verificationCode = generateRandomCode(6);
      const mailOptions = {
        from: `noreply from @keyplus.kr ${process.env.MAILID}`,
        to: req.body.email,
        subject: '[Keyplus] 이메일 인증번호를 입력해주세요.',
        html: `<div style="padding:10px 10px 0;"><h2 style="color:black;">이메일 인증을 완료하시려면 <b>인증번호</b>를 입력해주세요.</h2><h3 style="color:black;">인증번호를 입력하셔야만 이메일 인증이 완료됩니다.</h3> <h3 style="margin-bottom:130px">Keyplus 인증번호 : ${verificationCode}</h3><img src=${logo} width="auto" height="auto" alt="Keyplus Logo"></div>`,
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
};
