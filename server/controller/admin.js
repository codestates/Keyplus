const { User, Keyboard } = require('../models');

module.exports = {
  addKeyboard: async (req, res) => {
    const { name, brand, color, backlight, tenkey, bluetooth, price } =
      req.body;
    const admin = await User.findOne({
      where: { id: req.userId, isAdmin: true },
    });
    const keyboardImg = req.files.keyboardImg;
    const imgName = [];
    try {
      if (!admin) {
        return res.status(401).json({ message: 'Unauthorized Request' });
      }
      for (let i = 0; i < keyboardImg.length; i++) {
        imgName.push(keyboardImg[i].originalname);
      }

      await Keyboard.create({
        name,
        brand,
        switch: req.body.switch,
        color,
        backlight,
        tenkey,
        bluetooth,
        price,
        image1: imgName[0] || null,
        image2: imgName[1] || null,
        image3: imgName[2] || null,
        image4: imgName[3] || null,
        image5: imgName[4] || null,
        likeCount: 0,
      });
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
  updateKeyboard: async (req, res) => {
    const keyboardId = req.params.id;
    const { name, brand, color, backlight, tenkey, bluetooth, price } =
      req.body;
    const admin = await User.findOne({
      where: { id: req.userId, isAdmin: true },
    });
    const keyboardImg = req.files.keyboardImg;
    const imgName = [];
    const keyboardInfo = await Keyboard.findOne({
      attributes: ['image1', 'image2', 'image3', 'image4', 'image5'],
      where: { id: keyboardId },
      raw: true,
    });
    try {
      if (!admin) {
        return res.status(401).json({ message: 'Unauthorized Request' });
      }
      for (let i = 0; i < keyboardImg.length; i++) {
        imgName.push(keyboardImg[i].originalname);
      }
      await Keyboard.update(
        {
          name,
          brand,
          switch: req.body.switch,
          color,
          backlight,
          tenkey,
          bluetooth,
          price,
          image1: imgName[0] || keyboardInfo.image1 || null,
          image2: imgName[1] || keyboardInfo.image2 || null,
          image3: imgName[2] || keyboardInfo.image3 || null,
          image4: imgName[3] || keyboardInfo.image4 || null,
          image5: imgName[4] || keyboardInfo.image5 || null,
        },
        { where: { id: keyboardId } }
      );
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
  deleteKeyboard: async (req, res) => {
    const keyboardId = req.params.id;
    const admin = await User.findOne({
      where: { id: req.userId, isAdmin: true },
    });
    try {
      if (!admin) {
        return res.status(401).json({ message: 'Unauthorized Request' });
      }
      await Keyboard.destroy({ where: { id: keyboardId } });
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
};
