// import post schema
const postModel = require('../models/postSchema')
const ObjectID = require("mongoose").Types.ObjectId;
const getAuthUser = require('../middleware/verifyUser.middleware');
const userModel = require("../models/userSchema");

// Middleware who catch errors Async function
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

/*** POST MIDDLEWARES ***/

// create post
module.exports.createPost = catchAsync(async (req, res, next) => {
    // check if the request body is not empty
    if (!req.body.content) {
        return res.status(400).send({ message: "can not send an empty message" })
    }
    const post = req.file ? {
        imageUrl: `${req.protocol}://${req.get('host')}/upload/post/${req.file.filename}`,
        ...req.body
    } : {
        ...req.body
    }
    await postModel.create(post)
        .then(() => {
            res.status(201).json({
                status: 'success',
                data: {
                    post
                }
            })
        })
});

//  get all posts
module.exports.getPosts = catchAsync(async (req, res, next) => {
    const posts = await postModel.find().populate('comments').sort({ createdAt: -1 });
    res.status(200).json({ posts })
});

// get one post
module.exports.getOnePost = catchAsync(async (req, res, next) => {
    // check if the post is in the database
    const postIsExisting = await postModel.find({ _id: req.params.id });
    if (postIsExisting.length === 0) {
        return res.status(404).json({ message: "post not found" });
    }
    const post = await postModel.findOne({ _id: req.params.id }).populate('comments')
    res.status(200).json(post)
});

//  admin update post
module.exports.adminEditPost = catchAsync(async (req, res, next) => {
    // check if the post is in the database
    let postIsExisting = await postModel.findOne({ _id: req.params.id });
    if (postIsExisting === null) {
        return res.status(400).json({ message: "post not found" });
    }
    const updateContent = req.file ? {
        // parse to be able to update the image
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/upload/post/${req.file.filename}`,
    } : { ...req.body }
    await postModel.findByIdAndUpdate(
        req.params.id, {
        ...updateContent
    }
    )
        .then(() => {
            res.status(204).json({
                status: 'success',
                data: {
                    updateContent
                }
            })
        })
});

//  update post
module.exports.editPost = catchAsync(async (req, res, next) => {
    // check if the post is in the database
    let postIsExisting = await postModel.findOne({ _id: req.params.id });
    if (postIsExisting === null) {
        return res.status(400).json({ message: "post not found" });
    }
    // check if the request body is not empty
    if (!req.body.content) {
        return res.status(400).send({ message: "can not send an empty message" })
    }
    // check if the token provided is the user's token
    const user = await userModel.findById(req.body.posterId);
    if (user.email !== getAuthUser(req)) {
        return res.status(403).json({
            status: "Unauthorized"
        })
    }
    const updateContent = req.file ? {
        // parse to be able to update the image
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/upload/post/${req.file.filename}`,
    } : { ...req.body }
    await postModel.findByIdAndUpdate(
        req.params.id, {
        ...updateContent
    }
    )
        .then(() => {
            res.send({
                status: 'success',
                data: updateContent
            })
        })
});

// Admin delete post
module.exports.adminDeletePost = catchAsync(async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("post unknown");
    }
    await postModel.findByIdAndRemove(req.params.id)
    res.status(200).json({ message: "Successfully deleted. " })
});

// user delete post
module.exports.deletePost = catchAsync(async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("post unknown");
    }
    const postToDelete = await postModel.findOne({ _id: req.params.id });
    const authorId = req.body.authorId;
    if (postToDelete.posterId !== authorId) {
        return res.status(403).send('Unauthorized');
    } else {
        await postModel.findByIdAndRemove(req.params.id)
        res.status(200).json({ message: "Successfully deleted. " })
    }
})

// like post
module.exports.likePost = catchAsync(async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("post unknown");
    }
    const postToUpdate = await postModel.findById(req.params.id);
    // Check like value
    if (req.body.like > 1 || req.body.like < 0) {
        return res.status(400).json({ message: 'Invalid action' })
    }
    switch (req.body.like) {
        case 1:
            // check if the id isn't in the likes array
            if (postToUpdate.likes.includes(req.body.userId)) {
                return res.status(403).json({ message: 'the user already liked this post' })
            }
            await postToUpdate.updateOne(
                { $push: { likes: req.body.userId } }
            )
            return res.status(201).json({ status: "success" })
        case 0:
            if (!postToUpdate.likes.includes(req.body.userId)) {
                return res.status(403).json({ message: 'the user is not in the like array' })
            }
            await postToUpdate.updateOne(
                { $pull: { likes: req.body.userId } }
            )
            return res.status(204).json({ status: "success" })
        default: res.status(400).json({ message: 'Invalid action' })
    }
});

