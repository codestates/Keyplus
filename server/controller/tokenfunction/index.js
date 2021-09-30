require('dotenv').config();
const { sign } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    const token = sign(data, 'jwt', {
      expiresIn: '60s',
    });
    return token;
  },
  sendAccessToken: (res, accessToken) => {
    return res
      .status(200)
      .cookie('jwt', accessToken, {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
      })
      .json({ data: { accessToken }, message: 'OK' });
  },
};
