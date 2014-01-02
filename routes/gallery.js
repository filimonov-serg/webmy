/**
 * Created by Limon on 02.01.14.
 */
exports.get = function(req, res, next) {
    res.render('gallery', {title: 'Добавть альбом', isHere: 'gallery'});
};