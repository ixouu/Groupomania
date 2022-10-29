const commentModel = require('../models/commentSchema')
const ObjectID = require("mongoose").Types.ObjectId;

const catchAsync = require('../utils/catchAsync.js')

// create comment
module.exports.createComment = catchAsync(async (req, res, next) => {
    if (!req.body.content) {
        res.status(400).json({ status: 'declined', message: 'can not post an empty comment' })
    }
    const comment = await commentModel.create({
        ...req.body
    })
    await res.status(201).json({
        status: "success",
        data: {
            comment
        }
    })
});

// get one comment
module.exports.getOneComment = catchAsync(async (req, res, next) => {
    // check if the comment is in the database
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown");
    }
    const comment = await commentModel.findOne({ _id: req.params.id }).populate('post', '_id')
    if (!comment) {
        return res.status(404).json({ message: "comment not found" })
    }
    res.status(200).json({
        status: "success",
        data: comment
    })
})

// get all comments
module.exports.getComments = catchAsync(async (req, res, next) => {
    const comments = await commentModel.find().populate('post', '_id').sort({ createdAt: -1 })
    res.status(200).json({
        status: 'success',
        results: comments.length,
        data: {
            comments
        }
    })
})

// edit comment
module.exports.editComment = catchAsync(async (req, res, next) => {
    // check if the comment is in the database
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown");
    }
    const updateContent = req.body.content
    // check if the content is not empty
    if (!updateContent) {
        res.status(400).json({ status: 'declined', message: 'can not post an empty comment' })
    } else {
        const updatedComment = await commentModel.findByIdAndUpdate(
            req.params.id, {
            content: updateContent
        }
        )
        res.status(200).json({
            status: 'success',
            data: updatedComment
        })
    }
});

// delete comment
module.exports.deleteComment = catchAsync(async (req, res, next) => {
    // check if the comment is in the database
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown");
    }
    await commentModel.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "Successfully deleted. " })
});