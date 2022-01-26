const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/LoginDemo');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const token = new Schema({
  token: String,
  refreshToken: String,
}, {
  collection: "Token"
});

const TokenModel = mongoose.model('token', token);

module.exports = TokenModel;