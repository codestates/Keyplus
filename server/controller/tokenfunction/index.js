require('dotenv').config();
const { sign } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    // TODO: Access token으로 sign합니다.
    // HINT: 토큰을 리턴하세요. (공식 문서의 Synchronous한 방법을 사용합니다)
    const token = sign(data, 'jwt', {
      expiresIn: '2d',
    });
    return token;
  },
  sendAccessToken: (res, accessToken) => {
    // TODO: JWT 토큰을 쿠키로 전달합니다.
    return res
      .status(200)
      .cookie('jwt', accessToken, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .json({ data: { accessToken }, message: 'OK' });
  },
};
