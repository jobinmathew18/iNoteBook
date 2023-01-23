const mongoose = require("mongoose");
const {Schema} = require('mongoose')

const userschema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {   
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = new mongoose.model("User", userschema);
module.exports = User;