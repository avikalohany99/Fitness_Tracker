const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required:true,
        unique: true,
        trim: true, //trim white spaces before and after the username
        minlength: 3
    },
},{
    timestamps: true, //when username was created or modified
});

const User = mongoose.model('User', userSchema);

module.exports = User;