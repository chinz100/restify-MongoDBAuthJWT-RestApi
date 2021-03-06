const restify = require('restify');
const mongoose = require('mongoose');

const config = require('./config');
const rjwt = require('restify-jwt-community');
var Base64 = require('js-base64').Base64;


const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());
// protect routes
server.use(rjwt({
    secret: Base64.encode(config.JWT_SECRET),
    audience: ['okhttp/3.12.0', 'Postman runtime'],
    issuer: 'http://domain.com/',
    subject: 'Login',
    jwtid: '1', // billid
}).unless({ path: ['/register', '/auth'] }));

server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false)
    mongoose.connect(
        config.MONGODB_URI,
        { useNewUrlParser: true }
    );
})

const db = mongoose.connection;
db.on('error', err => console.log(err));

db.once('open', () => {
    require('./routes/customers')(server);
    require('./routes/users')(server);
    console.log(`Server started on PORT ${config.PORT}`);
});

