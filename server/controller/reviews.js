const { Review, User } = require('../models');

module.exports = {
  addReview: async (req, res) => {
    // 1. params 로 키보드 아이디를 받아온다.
    const keyboardId = req.params.id;
    const userId = req.userId;
    // 2. content, rating 를 클라이언트로부터 받아온다.
    const { content, rating } = req.body;
    try {
      // 3. 로그인이되어있는지 확인 후, 클라이언트로부터 받아온 정보를 Review table에 저장한다.
      const hasReview = await Review.findOne({
        where: {
          userId,
          keyboardId,
        },
      });
      const userInfo = await User.findOne({
        attributes: ['nickname', 'image'],
        where: {
          id: userId,
        },
        raw: true,
      });
      userInfo['userImage'] = userInfo['image'];
      delete userInfo['image'];

      if (hasReview)
        return res.status(409).json({ message: '이미 리뷰를 남기셨습니다.' });

      if (Object.keys(req.files).length !== 0) {
        let review = await Review.create({
          content,
          rating,
          image1: req.files.img1 ? req.files.img1[0].location : null,
          image2: req.files.img2 ? req.files.img2[0].location : null,
          image3: req.files.img3 ? req.files.img3[0].location : null,
          video: req.files.video ? req.files.video[0].location : null,
          userId,
          keyboardId,
        });
        Object.assign(review.dataValues, userInfo);
        return res.status(200).json({ data: review });
      } else {
        let review = await Review.create({
          content,
          rating,
          userId,
          keyboardId,
        });
        Object.assign(review.dataValues, userInfo);
        return res.status(200).json({ data: review });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  updateReview: async (req, res) => {
    // 1. params 로 리뷰 아이디를 받아온다.
    // 2. 받아온 리뷰 아이디와 Cookie 를 이용해서 특정 리뷰를 찾는다.
    // 3. 클라이언트로부터 받아온 업데이트 된 리뷰 정보를 DB에 새롭게 저장한다.
    const keyboardId = req.params.id;
    const userId = req.userId;
    const { content, rating, deleteImg1, deleteImg2, deleteImg3, deleteVideo } =
      req.body;

    const review = await Review.findOne({
      where: {
        userId,
        keyboardId,
      },
      raw: true,
    });

    if (!review)
      return res.status(409).json({ message: '남긴 리뷰가 없습니다.' });

    const userInfo = await User.findOne({
      attributes: ['nickname', 'image'],
      where: {
        id: userId,
      },
      raw: true,
    });
    userInfo['userImage'] = userInfo['image'];
    delete userInfo['image'];

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
          userId,
          keyboardId,
        },
        {
          where: {
            userId,
            keyboardId,
          },
        }
      );

      const updatedReview = await Review.findOne({
        where: { userId, keyboardId },
        raw: true,
      });
      Object.assign(updatedReview, userInfo);
      return res.status(200).json({ data: updatedReview });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  deleteReview: async (req, res) => {
    // 1. params 로 리뷰 아이디를 받아온다.
    // 2. 받아온 리뷰 아이디와 Cookie 를 이용해서 특정 리뷰를 찾는다.
    // 3. Destroy 를 이용해서 DB에서 삭제한다.
    const keyboardId = req.params.id;
    const userId = req.userId;
    try {
      const hasReview = await Review.findOne({
        where: {
          userId,
          keyboardId,
        },
      });

      if (!hasReview)
        return res.status(409).json({ message: '남긴 리뷰가 없습니다.' });

      await Review.destroy({
        where: {
          userId,
          keyboardId,
        },
      });
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getReviewLists: async (req, res) => {
    // 1. Cookie 를 이용해서 특정 유저가 작성한 리뷰 목록을 조회한다.
    // 2. 조회한 리뷰 목록을 클라이언트로 보내준다.
    const userId = req.userId;
    try {
      const userInfo = await User.findOne({
        attributes: ['nickname', 'image'],
        where: {
          id: userId,
        },
        raw: true,
      });
      userInfo['userImage'] = userInfo['image'];
      delete userInfo['image'];

      const reviewInfo = await Review.findAll({
        where: {
          userId,
        },
        raw: true,
      });

      reviewInfo.map((el) => {
        Object.assign(el, userInfo);
      });

      return res.status(200).json({ data: reviewInfo });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};
