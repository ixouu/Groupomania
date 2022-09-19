// import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import unique validator
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'post',
            required: true
        },
    }, {
        timestamps : true
    }
)

commentSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator'});

module.exports = mongoose.model('comment', commentSchema)