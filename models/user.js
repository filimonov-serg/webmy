/**
 * Created by Limon on 01.01.14.
 */

var crypto = require('crypto'),
    async = require('async'),
    util = require('util');

var mongoose = require('../utils/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default:  'user'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};
schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random()+'';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });

schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback) {
    var User = this;
    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if(user) {
                if(user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError("Неверный пароль"));
                }
            } else {
                callback(new AuthError("Неверный логин"));
            }
        }
    ], callback);
};

exports.User = mongoose.model('User', schema);

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;