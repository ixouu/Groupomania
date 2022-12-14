const userModel = require('../models/userSchema');
const ObjectID = require("mongoose").Types.ObjectId;
const getAuthUser = require('../middleware/verifyUser.middleware');

const {findAndUnlinkProfilImage } = require('../utils/unlinkImage');
const catchAsync = require('../utils/catchAsync.js');

// GET AllUsers
module.exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await userModel.find().select('-password -passwordConfirm -email -roles');
    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users
        }
    })
});

// GET User
module.exports.getUser = catchAsync(async (req, res, next) => {
    // check if the user is in the database
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown");
    }
    const user = await userModel.findOne({ _id: req.params.id }).select('-password -passwordConfirm -email -roles');
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
});

// update User
module.exports.updateUser = catchAsync(async (req, res, next) => {
    // check if the user is in the database
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown");
    }
    // check if the token provided is the user's token
    const user = await userModel.findById(req.params.id);
    if (user.email !== getAuthUser(req)) {
        return res.status(403).json({
            status: "Unauthorized"
        })
    }
    req.file && findAndUnlinkProfilImage(user);
    const userContent = req.file ? {
        // parse to be able to update image
        ...req.body,
        photo: `/upload/profile/${req.file.filename}`,
    } : { ...req.body };
    await userModel.findByIdAndUpdate(
        req.params.id, {
        ...userContent
    }
    )
        .then(() => {
            res.status(200).json({
                status: 'success'
            })
        })
});

// admin update user
module.exports.adminUpdateUser = catchAsync(async (req, res, next) => {
    // check if the user is in the database
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown");
    }
    await userModel.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, {
        new: true
    })
    const userContent = req.file ? {
        // parse to be able to update image
        ...req.body,
        photo: `/upload/profile/${req.file.filename}`,
    } : { ...req.body };
    await userModel.findByIdAndUpdate(
        req.params.id, {
        ...userContent
    }
    )
        .then(() => {
            res.status(200).json({
                status: 'success'
            })
        })
});

// Add Follower user
module.exports.addFollower = catchAsync(async (req, res, next) => {
    // check if the user is in the database
    if (!ObjectID.isValid(req.params.id || ObjectID.isValid(req.body.followerId))) {
        return res.status(400).send("IDs unknown");
    }
    // Define the user to Update
    const userToUpdate = await userModel.findById(req.params.id);
    // Check if the id to follow isn't already existing in the following array
    if (userToUpdate.followers.includes(req.body.followerId)) {
        return res.status(404).send(`Follower list already contains ${req.body.followerId}`)
    }
    // add to the follower list
    await userToUpdate.updateOne(
        { $push: { followers: req.body.followerId } },
    )
    return res.status(200).json({ status: "success" })
});

// Following user
module.exports.followUser = catchAsync(async (req, res, next) => {
    // check if the user is in the database
    if (!ObjectID.isValid(req.params.id || ObjectID.isValid(req.body.userIdToFollow))) {
        return res.status(400).send("IDs unknown");
    }
    // Define the user to Update
    const userToUpdate = await userModel.findById(req.params.id);
    // Check if the id to follow isn't already existing in the follower array
    if (userToUpdate.following.includes(req.body.userIdToFollow)) {
        return res.status(404).send(`Following list already contains ${req.params.id}`)
    }
    // add to the follower list
    await userToUpdate.updateOne(
        { $push: { following: req.body.userIdToFollow } },
    )
    return res.status(200).json({ status: "success", userToUpdate })
});


// Remove follower
module.exports.removeFollower = catchAsync(async (req, res, next) => {
    // check if the user is in the database
    if (!ObjectID.isValid(req.params.id || ObjectID.isValid(req.body.followerId))) {
        return res.status(400).send("IDs unknown");
    }
    // Define the user to update
    const userToUpdate = await userModel.findById(req.params.id)
    if (!userToUpdate.followers.includes(req.body.followerId)) {
        return res.status(404).send(`Follower list does not contains ${req.body.followerId}`)
    }
    // Remove follower id to the followers list
    await userToUpdate.updateOne(
        { $pull: { followers: req.body.followerId } }
    )
    return res.status(200).json({ status: "success" })
});

// Remove following user
module.exports.removeFollowingUser = catchAsync(async (req, res, next) => {
    // check if the user is in the database
    if (!ObjectID.isValid(req.params.id || ObjectID.isValid(req.body.userIdToUnfollow))) {
        return res.status(400).send("IDs unknown");
    }
    // Define the user to update
    const userToUpdate = await userModel.findById(req.params.id)
    if (!userToUpdate.following.includes(req.body.userIdToUnfollow)) {
        return res.status(404).send(`Following list does not contains ${req.body.userIdToUnfollow}`)
    }
    // Remove id from the following list
    await userToUpdate.updateOne(
        {
            $pull: { following: req.body.userIdToUnfollow }
        }
    )
    return res.status(200).json({ status: "success" })
});