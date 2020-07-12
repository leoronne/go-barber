require('dotenv/config');

export default {
  jwt: {
    secret: process.env.AUTH_KEY,
    expiresIn: '1d',
  },
};
