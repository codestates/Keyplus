const db = require('../models');
const { Review, User, Keyboard, sequelize } = require('../models');

module.exports = {
  getReviewsByKeyboardId: async (req, res) => {
    // 1. params 로 키보드 아이디를 받아온다.
    // 2. keyboard를 찾고,
    try {    
      const keyboard = await Keyboard.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        where: {
          id: req.params.id,
          },
          raw: true,
        });
      // 2. 받아온 키보드아이디로 등록되어있는 리뷰를 조회한 후 keyboard와 붙여 클라이언트로 보내준다.
      const keyboardReview = await Review.findAll({
        where: {
          keyboardId: req.params.id,
        },
        attributes: [ 'id', 'nickname', 'content', 'rating', 'image1' ,'image2', 'image3' ],  // nickname도 붙여야 됌
        raw: true,
      })
      const review = { reviews : keyboardReview };
      const result = Object.assign(keyboard, review);
      
      return res.status(200).json({ data: result });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  addReview: async (req, res) => {
    // 1. params 로 키보드 아이디를 받아온다.
    const keyboard = req.params.id;
    const user = req.userId;
    // 2. content, rating 를 클라이언트로부터 받아온다.
    const { content, rating } = req.body;
      try {
        // 3. 로그인이되어있는지 확인 후, 클라이언트로부터 받아온 정보를 Review table에 저장한다.
        const nickname = await User.findOne({
          attributes: [ 'nickname' ],
          where: {
            id: req.userId,
          },
          raw: true,
        });
        if (Object.keys(req.files).length !== 0) {
          const img = req.files.img ? req.files.img.map(el => el.location) : '';
          let review = await Review.create({
            nickname: nickname.nickname,
            content,
            rating,
            image1: img[0] || null,
            image2: img[1] || null,
            image3: img[2] || null,
            video: req.files.video ? req.files.video[0].location : null,
            userId: user,
            keyboardId: keyboard,
          });
          return res.status(200).json({ data: review });
        } else {
        let review = await Review.create({
            nickname: nickname.nickname,  
            content,
            rating,
            userId: user,
            keyboardId: keyboard,
          });
          return res.status(200).json({ data: review });
        }
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  updateReview: async (req, res) => {
    // 1. params 로 리뷰 아이디를 받아온다.
    // 2. 받아온 리뷰 아이디와 Cookie 를 이용해서 특정 리뷰를 찾는다.
    // 3. 클라이언트로부터 받아온 업데이트 된 리뷰 정보를 DB에 새롭게 저장한다.
    const keyboard = req.params.id;
    const user = req.userId;
    const { content, rating } = req.body;
    
    try {
      const nickname = await User.findOne({
        attributes: [ 'nickname' ],
        where: {
          id: req.userId,
        },
        raw: true,
      });
      if (Object.keys(req.files).length !== 0) {
        const img = req.files.img ? req.files.img.map(el => el.location) : '';
        await Review.update({
          nickname: nickname.nickname,
          content,
          rating,
          image1: img[0] || null,
          image2: img[1] || null,
          image3: img[2] || null,
          video: req.files.video ? req.files.video[0].location : null,
          userId: user,
          keyboardId: keyboard,
        }, {
          where: {
            userId: req.userId,
            keyboardId: req.params.id
          },
        });
        const review = await Review.findOne({
          where: {
            userId: user,
            keyboardId: keyboard,
          },
          raw: true,
        });
        return res.status(200).json({ data: review });
      } else {
        await Review.update({
          nickname: nickname.nickname,  
          content,
          rating,
          image1: null,
          image2: null,
          image3: null,
          video: null,
          userId: user,
          keyboardId: keyboard,
        }, {
          where: {
          userId: req.userId,
          keyboardId: req.params.id
          },
        });
        const review = await Review.findOne({
          where: {
            userId: user,
            keyboardId: keyboard,
          },
          raw: true,
        });
        return res.status(200).json({ data: review });
      }
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  deleteReview: async (req, res) => {
    // 1. params 로 리뷰 아이디를 받아온다.
    // 2. 받아온 리뷰 아이디와 Cookie 를 이용해서 특정 리뷰를 찾는다.
    // 3. Destroy 를 이용해서 DB에서 삭제한다.
    try {
      await Review.destroy({
        where: {
          userId: req.userId,
          keyboardId: req.params.id,
        }
      });
      return res.status(200);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  getReviewLists: async (req, res) => {
    // 1. Cookie 를 이용해서 특정 유저가 작성한 리뷰 목록을 조회한다.
    // 2. 조회한 리뷰 목록을 클라이언트로 보내준다.
    try {
      const reviews = await Review.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        where: {
          userId: req.userId,
        },
        raw: true,
      });
      return res.status(200).json({ data: reviews });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
