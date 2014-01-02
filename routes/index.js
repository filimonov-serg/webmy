var checkAuth = require('../middleware/checkAuth');
var checkRole = require('../middleware/checkRole');

module.exports = function(app) {
    app.get('/', require('./home').get);

    /**
     * Login and reg
     */
    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);
    app.get('/logout', require('./login').logout);

    /**
     * Gallery
     */
    app.get('/gallery', checkAuth, checkRole, require('./gallery').get);
};