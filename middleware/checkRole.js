/**
 * Created by Limon on 02.01.14.
 */
var HttpError = require('../error').HttpError;

module.exports = function(req, res, next) {
    console.log(req.user);
    if(req.user.role != 'admin')
        return next(new HttpError(401, "You are not admin"));
    next();
};