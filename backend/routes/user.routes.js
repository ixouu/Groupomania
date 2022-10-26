const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const multer = require('../middleware/multerProfile.middleware');
const auth = require('../middleware/auth.middleware');
const ROLE_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles.middleware');

// signup
router.post("/signup", authController.signUp);

// login
router.post("/login", authController.login);

// logout
router.post("/logout", authController.logout);

// GET all users
router.get('/', userController.getAllUsers);

// GET one user
router.get('/:id', userController.getUser);

// Update
router.put('/:id', auth, multer, userController.updateUser);

// Admin Update
router.put('/admin/:id', auth, verifyRoles(ROLE_LIST.Admin), userController.adminUpdateUser);

// Add Follower user
router.put('/add-follower-user/:id', auth, userController.addFollower);

// Add following user
router.put('/add-following-user/:id', auth, userController.followUser);

// Remove follower user
router.put('/remove-follower/:id', auth, userController.removeFollower);

// Remove following user
router.put('/remove-following/:id', auth, userController.removeFollowingUser);

module.exports = router;