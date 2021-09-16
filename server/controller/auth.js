const db = require('../models');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

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
      `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https://api.keyplus.kr/auth/googleCallback&client_id=1001972392375-bnmmb3v2co8p0uobbcmn5gorkbq65648.apps.googleusercontent.com`
    );
  },
  googleCallback: async (req, res) => {
    // redirectUri 를 googleCallback 으로 설정해서 authorizationcode 받기
    const code = req.query.code; // authorization code
    try {
      const result = await axios.post(
        // authorization code를 이용해서 access token 요청
        `https://oauth2.googleapis.com/token?code=${code}&client_id=1001972392375-bnmmb3v2co8p0uobbcmn5gorkbq65648.apps.googleusercontent.com&client_secret=Bz_7AoEpTFlvkaXGgKUSelTN&redirect_uri=https://api.keyplus.kr/auth/googleCallback&grant_type=authorization_code`
      );
      const userInfo = await axios.get(
        // access token 유저정보 요청
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`,
          },
        }
      );
      console.log(userInfo);
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
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        socialType: user.socialType,
        isAdmin: user.isAdmin,
        image: user.image,
      });
      console.log('====================token', token);
      res
        .status(200)
        .cookie('jwt', token, {
          sameSite: 'None',
          httpOnly: true,
          secure: true,
        })
        .json({ data: user });

      res.redirect(`https://keyplus.kr/temp?accessToken=${token}`);
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
        // authorization code를 이용해서 access code 요청
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`
      );

      const userInfo = await axios.get(
        // access code로 유저정보 요청
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
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        socialType: user.socialType,
        isAdmin: user.isAdmin,
        image: user.image,
      });

      res.cookie('jwt', token, {
        sameSite: 'None',
        httpOnly: true,
        secure: true,
      });

      res.redirect(`https://keyplus.kr/temp?accessToken=${token}`);
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
    const code = req.query.code;
    console.log('===================CODE', code);
    try {
      const result = await axios.post(
        // authorization code를 이용해서 access code 요청
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_URI}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`
      );
      console.log('========result', result);
      const userInfo = await axios.get(
        // access code로 유저정보 요청
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
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        socialType: user.socialType,
        isAdmin: user.isAdmin,
        image: user.image,
      });

      res.cookie('jwt', token, {
        sameSite: 'None',
        httpOnly: true,
        secure: true,
      });

      res.redirect(`https://keyplus.kr/temp?accessToken=${token}`);
    } catch (error) {
      console.error(error);
      console.log('hihihihihi');
      res.sendStatus(500);
      console.log('hihihihihi');
    }
  },
};
