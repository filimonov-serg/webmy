/**
 * Created by Limon on 01.01.14.
 */
var winston = require('winston');

module.exports = function(app, module) {
    return makeLogger(module.filename);
};

function makeLogger(path) {
    var transports = [
        new winston.transports.Console({
            //timestamp: true,
            colorize: true,
            level: 'info',
            label: path.split('/').slice(-2).join('/')
        })/*,
        new winston.transports.File({filename: 'debug.log', level: 'debug'})
        */
    ];

    return new winston.Logger({ transports: transports });
}