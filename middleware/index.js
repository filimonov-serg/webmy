/**
 * Created by Limon on 01.01.14.
 */

module.exports = function(app, express) {
    var path = require('path'),
        jade = require('jade'),
        config = require('../config'),

        mongoose = require('../utils/mongoose'),
        MongoStore = require('connect-mongo')(express),

        router = require('../routes'),
        errorHandler = require('./errorHandler')(app, express),
        HttpError = require('../error').HttpError,

        checkAuth = require('./checkAuth');

    app.engine('jade', jade.__express);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    app.use(express.favicon('public/images/favicon.ico'));
    //app.set('env', 'production');

    if(app.get('env') == 'development') {
        app.use(express.logger('dev'));
    }

    /**
     * Session
     */
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.get('session:secret'),
        key: config.get('session:key'),
        cooike: config.get('session:cookie'),
        store: new MongoStore({mongoose_connection: mongoose.connection})
    }));
    app.use(require('./loadUser'));
    /**
     * Authorization Access
     */
    //app.use(checkAuth);

    /**
     * Routing
     */
    app.use(app.router);
    router(app);


    app.use(express.static(path.join(__dirname, '../public')));
    app.use("/public", express.static(path.join(__dirname, '../public')));

    /**
     * Error handling
     */
    app.use(errorHandler);
}
