/**
 * Created by Limon on 02.01.14.
 */
exports.get = function(req, res) {
  res.render('index', {title: 'Home', isHere: 'home'});
};