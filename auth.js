const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.autenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {

        try {
            //get user by email
            const user = await User.findOne({ email });

            //Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    reject('Authentication Failed');
                }
            })
        } catch (err) {
            // Pass didn't match
            reject('Authentication Failed');
        }
    })
}