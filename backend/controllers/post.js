const POST = require('../models/post');

exports.getPosts = (req, res, next) => {
  POST.find().then(doc => {
    res.status(200).json({ posts: doc })
  });
}

exports.addPost = (req, res, next) => {
  const post = new POST({
    title: req.body.title,
    content: req.body.content,
    imagePath: 'unknown',
    creator: req.userData.userId
  });
  post.save().then(result => {
    res.status(201).json({
      post: result,
      message: 'Post added successfully'
    });
  })
  .catch(error => {
    res.status(500).json({ message: 'Creating a post failed!'});
  })
}
