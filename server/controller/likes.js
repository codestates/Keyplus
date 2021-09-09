const db = require('../models');
const { User, Keyboard } = require('../models');

module.exports = {
  getLikeKeyboardLists: async (req, res) => {
    // 1. Cookie를 이용해서 특정 유저가 좋아요 누른 키보드 아이디를 조회한다.
    // 2. 조회한 키보드 아이디로 키보드 정보를 찾은 후 그 정보를 클라이언트에 보내준다.
  },
  updateLikeKeyboardLists: async (req, res) => {
    // 1. params 로 키보드 아이디를 받아온다.
    // 2. Cookie 를 이용해 유저아이디도 조회한다.
    /* 3. Likes DB에 params로 받아온 아이디와 Cookie를 이용해 조회한 유저아이디가 존재하지않는다면,
          Keyboard 테이블에 likeCount 컬럼을 1 증가시킨 후, Like 테이블에 키보드아이디와 유저아이디를 추가해준다. */
    /* 4. Likes DB에 params로 받아온 아이디와 Cookie를 이용해 조회한 유저아이디가 존재한다면,
          Keyboard 테이블에 likeCount 컬럼을 1 감소시킨 후, Like 테이블에 키보드아이디와 유저아이디를 삭제해준다. */
  },
};
