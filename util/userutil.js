const bcrypt = require('bcrypt-nodejs');

exports.hashPassword = function hashPassword(password, done) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return done(err, null);
        }

        bcrypt.hash(password, salt, null, (err, hash) => {
            if (err) {
                return done(err, null);
            }
            done(null, hash);
        });
    });
};
