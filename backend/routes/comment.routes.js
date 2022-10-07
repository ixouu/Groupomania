const router = require('express').Router();
const auth = require('../middlerware/auth.middleware');
const commentController = require('../controllers/comment.controller');
const ROLE_LIST = require('../config/roles_list');
const verifyRoles = require('../middlerware/verifyRoles.middleware');

/*** COMMENTS DATABASE ***/

// create a comment
router.post('/', auth, commentController.createComment);

// get a comment
router.get('/:id', auth, commentController.getOneComment)

// get all comments
router.get('/', commentController.getComments)

// edit a comment
router.put('/:id', auth,commentController.editComment)

// delete a comment
router.delete('/:id',auth , verifyRoles(ROLE_LIST.Admin), commentController.deleteComment);


module.exports = router;