const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../auth');
const config = require('../config');

module.exports = server => {

    server.post('/register', (req, res, next) => {
        const { email, password } = req.body;

        const user = new User({
            email,
            password,
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                //Hash Password
                user.password = hash;
                //save User
                try {
                    const newUser = await user.save();
                    res.send(newUser)
                    next();
                } catch (err) {
                    return next(new errors.InternalError(err.message))
                }
            });
        })
    })



    //auth User
    server.post('/auth', async (req, res, next) => {
        const { email, password } = req.body;
        try {
            //Authenticate User
            const user = await auth.autenticate(email, password);

            //CreateJWT
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                algorithm: 'HS384', //Encode Security
                //  expiresIn: 3,
                //   notBefore: '15m',
                audience: 'Postman runtime',
                subject: 'Login',
                issuer: 'http://domain.com/',
                jwtid: '1',
                keyid: '1'
            });

            // console.log(token)
            /*
            var decoded = jwt.verify(token, config.JWT_SECRET);
            console.log(decoded)
            */

            const { jti, iat, nbf, aud, sub, iss, exp } = jwt.decode(token);
            res.send({ jti, iat, nbf, aud, sub, iss, exp, token });
            next();
        } catch (err) {
            return next(new errors.UnauthorizedError(err));
        }
    })
} 