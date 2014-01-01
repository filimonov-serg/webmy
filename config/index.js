/**
 * Created by Limon on 01.01.14.
 */
var nconf = require('nconf'),
    path = require('path');

nconf.argv().env().file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;
