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
    // 2. User 테이블에서 유저정보를 찾는다
    // 3. 유저정보가 없거나, 비밀번호가 틀릴경우 401 코드와 함께 오류 메시지를 보내준다.
    // 4. 유저정보가 있으면 유저 테이블에서 정보를가져와서 res에 담아서 토큰과함께 클라이언트로 보내준다.
  },
  logout: async (req, res) => {
    // 1. clearCookie
  },
  signup: async (req, res) => {
    // 1. email, nickname, password, image 를 클라이언트에서 받아온다.
    // 2. 패스워드를 hashing 해준 후 DB에 저장한다.
    // 3. User.create 를 사용해서 유저정보를 DB에 저장한다.
  },
  getUser: async (req, res) => {
    // 1. Cookie 를 이용해서 ( req.userId ) 유저정보를 가져온다.
    // 2. 가져온 유저정보를 res에 담아서 클라이언트로 보내준다.
  },
  updateUser: async (req, res) => {
    // 1. nickname, password, image를 클라이언트로부터 받아온다.
    // 2. 클라이언트로 받아온 유저 정보를 Cookie를 이용해서 조회 후, User.update 로 수정한다.
    // 3. 업데이트된 유저정보를 res에 담아서 클라이언트로 보내준다.
    // 4. 중요한점은 비밀번호 수정 시 hashing 해줄 것
  },
  deleteUser: async (req, res) => {
    // 1. Cookie 를 이용해서 유저정보를 조회한 후, User.destroy 로 해당 DB를 삭제해준다.
  },
  googleLogin: async (req, res) => {},
  naverLogin: async (req, res) => {},
  kakaoLogin: async (req, res) => {},
  validateEmail: async (req, res) => {
    // 1. Email 을 클라이언트에서 받아온 후, DB에 저장되어있는지 확인.
    // 2. 저장되어있다면 오류메시지를 보내준다.
    // 3. 저장되어있지않으면 인증코드를 res에 담아서 클라이언트로 보내준다.
  },
  validateNickname: async (req, res) => {
    // 1. Nickname 을 클라이언트에서 받아온 후, DB에 저장되어있는지 확인.
    // 2. 저장되어있다면 오류메시지를 보내준다.
    // 3. 저장되어있지않으면 OK 메시지
  },
  checkToken: async (req, res) => {
    const userInfo = await User.findOne({ where: { id: 1 } });
    console.log(userInfo);
    const token = generateAccessToken({ id: userInfo.dataValues.id });
    return sendAccessToken(res, token);
  },
};
