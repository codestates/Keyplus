const db = require('../models');
const { Review, User, Keyboard, sequelize } = require('../models');

module.exports = {
  addReview: async (req, res) => {
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
      const getUserInfo = await User.findOne({
        attributes: ['nickname', 'image'],
        where: {
          id: user,
        },
        raw: true,
      });
      getUserInfo['userImage'] = getUserInfo['image'];
      delete getUserInfo['image'];

      if (!hasReview) {
        if (Object.keys(req.files).length !== 0) {
          let review = await Review.create({
            content,
            rating,
            image1: req.files.img1 ? req.files.img1[0].location : null,
            image2: req.files.img2 ? req.files.img2[0].location : null,
            image3: req.files.img3 ? req.files.img3[0].location : null,
            video: req.files.video ? req.files.video[0].location : null,
            userId: user,
            keyboardId: Number(keyboard),
          });
          Object.assign(review.dataValues, getUserInfo);
          return res.status(200).json({ data: review });
        } else {
          let review = await Review.create({
            content,
            rating,
            userId: user,
            keyboardId: keyboard,
          });
          Object.assign(review.dataValues, getUserInfo);
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
    const { content, rating, deleteImg1, deleteImg2, deleteImg3, deleteVideo } =
      req.body;

    const review = await Review.findOne({
      where: {
        userId: user,
        keyboardId: keyboard,
      },
      raw: true,
    });

    const getUserInfo = await User.findOne({
      attributes: ['nickname', 'image'],
      where: {
        id: user,
      },
      raw: true,
    });
    getUserInfo['userImage'] = getUserInfo['image'];
    delete getUserInfo['image'];

    if (req.files && req.files.img1) {
      review.image1 = req.files.img1[0].location;
    } else if (deleteImg1 === '1') {
      review.image1 = null;
    }
    if (req.files && req.files.img2) {
      review.image2 = req.files.img2[0].location;
    } else if (deleteImg2 === '1') {
      review.image2 = null;
    }
    if (req.files && req.files.img3) {
      review.image3 = req.files.img3[0].location;
    } else if (deleteImg3 === '1') {
      review.image3 = null;
    }
    if (req.files && req.files.video) {
      review.video = req.files.video[0].location;
    } else if (deleteVideo === '1') {
      review.video = null;
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
      Object.assign(updatedReview, getUserInfo);
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
      const getUserInfo = await User.findOne({
        attributes: ['nickname', 'image'],
        where: {
          id: req.userId,
        },
        raw: true,
      });
      getUserInfo['userImage'] = getUserInfo['image'];
      delete getUserInfo['image'];

      const reviews = await Review.findAll({
        where: {
          userId: req.userId,
        },
        raw: true,
      });

      reviews.map((el) => {
        Object.assign(el, getUserInfo);
      });

      return res.status(200).json({ data: reviews });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  },
};
