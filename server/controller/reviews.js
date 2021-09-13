const db = require('../models');
const { Review, User, Keyboard } = require('../models');

module.exports = {
  getReviewsByKeyboardId: async (req, res) => {
    // 1. params 로 키보드 아이디를 받아온다.
    // 2. 받아온 키보드아이디로 등록되어있는 리뷰를 조회한 후 클라이언트로 보내준다.
  },
  addReview: async (req, res) => {
    // 1. params 로 키보드 아이디를 받아온다.
    const keyboard = req.params.id;
    const user = req.userId;
    const img = req.files.img.map(el => el.key)
    console.log(img)
    const { content, rating } = req.body;
    
    // const review = await Review.create({
    //   content,
    //   rating,
    // })
    
    res.status(200).json({ data: keyboard })
    // 2. content, rating, image, video를 클라이언트로부터 받아온다.
    // 3. 로그인이되어있는지 확인 후, 클라이언트로부터 받아온 정보를 Review table에 저장한다.
  },
  updateReview: async (req, res) => {
    // 1. params 로 리뷰 아이디를 받아온다.
    // 2. 받아온 리뷰 아이디와 Cookie 를 이용해서 특정 리뷰를 찾는다.
    // 3. 클라이언트로부터 받아온 업데이트 된 리뷰 정보를 DB에 새롭게 저장한다.
  },
  deleteReview: async (req, res) => {
    // 1. params 로 리뷰 아이디를 받아온다.
    // 2. 받아온 리뷰 아이디와 Cookie 를 이용해서 특정 리뷰를 찾는다.
    // 3. Destroy 를 이용해서 DB에서 삭제한다.
  },
  getReviewLists: async (req, res) => {
    // 1. Cookie 를 이용해서 특정 유저가 작성한 리뷰 목록을 조회한다.
    // 2. 조회한 리뷰 목록을 클라이언트로 보내준다.
  },
};
