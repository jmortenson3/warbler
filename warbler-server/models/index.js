const mongoose = require('mongoose');
const dbConfig = require('../config').development.database;

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(`mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`, {
  keepAlive: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
