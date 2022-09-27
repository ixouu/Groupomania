// import mongoose
const mongoose = require('mongoose');

// import unique validator
const uniqueValidator = require('mongoose-unique-validator')

// import validator
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 55,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 55,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            validate: [validator.isEmail]
        },
        hiddenEmail: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 8,
        },
        passwordConfirm : {
            type: String,
            required: true,
            max: 1024,
            minlength: 8,
        },
        bio: {
            type: String,
            default : '',
            max: 1024,
        },
        photo: {
            type: String,
            default: 'http://localhost:5000/upload/profile/random-user.png',
            required: false,
        },
        followers: {
            type: Array,
            required: false,
            default: []
        },
        following: {
            type: Array,
            required: false,
            default: []
        },
        roles: {
            type: Object,
            required : true,
            default : {
                "User" : 2001
            }
        },
    }, {
        timestamps: true
    }
)

userSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator'});

module.exports = mongoose.model('user', userSchema);