const express = require('express');
const router = express.Router();

const postCrtl = require('../controllers/post');

// import middleware to check type of image file and authorization.
const extractFile = require('../middleware/file');
const checkAuth = require('../middleware/check-auth');

router.get('/api/posts', postCrtl.getPosts);
router.get('/api/posts/:id', postCrtl.getPost);
router.post('/api/posts/add', checkAuth, extractFile, postCrtl.addPost);
// router.put('/api/posts/update', postCrtl);
router.delete('/api/posts/:id', checkAuth, extractFile, postCrtl.deletePost);

module.exports = router;
