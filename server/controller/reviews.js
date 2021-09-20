const db = require('../models');
const { Review, User, Keyboard, sequelize } = require('../models');

module.exports = {
  addReview: async (req, res) => {
    console.log(req.files);
    // 1. params 로 키보드 아이디를 받아온다.
    const keyboard = req.params.id;
    const user = req.userId;
    // 2. content, rating 를 클라이언트로부터 받아온다.
    const { content, rating } = req.body;
    try {
      // 3. 로그인이되어있는지 확인 후, 클라이언트로부터 받아온 정보를 Review table에 저장한다.
      const hasReview = await Review.findOne({
        where: {
          userId: user,
          keyboardId: keyboard,
        },
      });
      if (!hasReview) {
        if (Object.keys(req.files).length !== 0) {
          const img = req.files.img
            ? req.files.img.map((el) => el.location)
            : '';
          let review = await Review.create({
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
            content,
            rating,
            userId: user,
            keyboardId: keyboard,
          });
          return res.status(200).json({ data: review });
        }
      } else {
        return res.sendStatus(409);
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  },
  updateReview: async (req, res) => {
    // 1. params 로 리뷰 아이디를 받아온다.
    // 2. 받아온 리뷰 아이디와 Cookie 를 이용해서 특정 리뷰를 찾는다.
    // 3. 클라이언트로부터 받아온 업데이트 된 리뷰 정보를 DB에 새롭게 저장한다.
    const keyboard = req.params.id;
    const user = req.userId;
    const { content, rating } = req.body;

    const review = await Review.findOne({
      where: {
        userId: user,
        keyboardId: keyboard,
      },
      raw: true,
    });
    if (Object.keys(req.files).length !== 0) {
      if (req.files.img) {
        review.image1 = req.files.img[0] || null;
        review.image2 = req.files.img[1] || null;
        review.image3 = req.files.img[2] || null;
      }
      if (req.files.video) {
        review.video = req.files.video;
      }
    }

    try {
      await Review.update(
        {
          content,
          rating,
          image1: review.image1,
          image2: review.image2,
          image3: review.image3,
          video: review.video,
          userId: user,
          keyboardId: keyboard,
        },
        {
          where: {
            userId: req.userId,
            keyboardId: req.params.id,
          },
        }
      );

      const updatedReview = await Review.findOne({
        where: { userId: req.userId, keyboardId: req.params.id },
        raw: true,
      });
      return res.status(200).json({ data: updatedReview });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
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
        },
      });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  },
  getReviewLists: async (req, res) => {
    // 1. Cookie 를 이용해서 특정 유저가 작성한 리뷰 목록을 조회한다.
    // 2. 조회한 리뷰 목록을 클라이언트로 보내준다.
    try {
      const reviews = await Review.findAll({
        where: {
          userId: req.userId,
        },
        raw: true,
      });
      return res.status(200).json({ data: reviews });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  },
};
