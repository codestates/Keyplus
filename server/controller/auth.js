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
  googleLogin: async (req, res) => {},
  naverLogin: async (req, res) => {},
  kakaoLogin: async (req, res) => {},
};
