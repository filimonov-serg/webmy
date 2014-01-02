/**
 * Created by Limon on 02.01.14.
 */
var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require('async');

exports.get = function(req, res) {
    res.render('login', {title: 'Авторизация', isHere: 'login'});
};

exports.post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function(err, user) {
       if(err) {
            if(err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
       }
        req.session.user = user._id;
        res.send({});
    });
};

exports.logout = function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
}