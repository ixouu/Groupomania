const router = require('express').Router();
const postController = require('../controllers/post.controller');
const auth = require('../middlerware/auth.middleware');
const multer = require('../middlerware/multerPost.middleware');
const ROLE_LIST = require('../config/roles_list');
const verifyRoles = require('../middlerware/verifyRoles.middleware');

/*** POST DATABASE ***/

// get  all posts
router.get('/',  postController.getPosts);

// get one post
router.get('/:id',auth, postController.getOnePost);

// create post
router.post('/', auth, multer, postController.createPost);

// Update post
router.put('/:id', auth, multer, postController.editPost);

// Delete post
router.delete('/:id',auth, verifyRoles(ROLE_LIST.Admin),  postController.deletePost);

// like a post
router.put('/like-post/:id', auth, postController.likePost);

module.exports = router;