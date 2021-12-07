const db = require('../models');
const { Shop } = require('../models');

module.exports = {
  getAllShops: async (req, res) => {
    try {
      const shops = await Shop.findAll({});
      return res.status(200).json({ data: shops, message: 'ok' });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};
