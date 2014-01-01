/**
 * Created by Limon on 01.01.14.
 */
var mongoose = require('mongoose'),
    config = require('../config');

mongoose.connect(config.get('mongoose:uri')+'/'+config.get('mongoose:name'), config.get('mongoose:options'));

module.exports = mongoose;


