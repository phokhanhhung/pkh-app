const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pkh-app:pkh-app@pkh-app.k1zty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const account = new Schema({
  username: String,
  password: String,
}, {
  collection: "Account"
});

const AccountModel = mongoose.model('account', account);

module.exports = AccountModel;