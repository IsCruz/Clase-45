const mongoose = require('mongoose');
const Schema = mongoose.Schema;let Users = new Schema({
    user_name: {
        type: String
    },
    user_pass: {
      type: String
    }
});module.exports = mongoose.model('Users', Users);
