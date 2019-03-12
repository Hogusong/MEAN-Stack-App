const express = require('express');
const router = express.Router();

const postCrtl = require('../controllers/post');

router.get('/api/posts', postCrtl.getPosts);
// router.get('/api/posts/:id', postCrtl);
router.post('"/api/posts/add', postCrtl.addPost);
// router.put('/api/posts/update', postCrtl);
// router.delete('/api/posts/:id', postCrtl);

module.exports = router;
