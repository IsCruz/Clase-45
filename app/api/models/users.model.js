const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
});

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

// create Schema
const NewUserSchema = new Schema();
// add old schema and add new field
NewUserSchema.add(UserSchema).add({
    username: {
        type: String
    }
});

// assign new user schema
module.exports = mongoose.model('User', NewUserSchema);