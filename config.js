var Base64 = require('js-base64').Base64;

module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
    JWT_SECRET: process.env.JWT_SECRET || Base64.encode('KeySecretJWT1')
};