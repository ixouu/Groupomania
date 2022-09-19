// import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import unique validator
const uniqueValidator = require('mongoose-unique-validator')

const postSchema = new mongoose.Schema(
    {
        PosterId : {
            type : String,
            required: true
        },
        content: {
            type: String,
            required: true,
            maxlength: 500,
        },
        imageUrl: {
            type: String,
        },
        likes: {
            type: Array,
            default: []
        },
        comments: [{
            type : Schema.Types.ObjectId,
            ref : 'comment',
            required: true
        }],
    },{
        timestamps : true
    }
)

postSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

module.exports = mongoose.model('post', postSchema)