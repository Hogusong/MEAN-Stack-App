const POST = require('../models/post');

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currPage = +req.query.currPage;
  let fetchedPosts;
  const postQuery = POST.find();
  if (currPage > 0) {
    postQuery.skip(pageSize * (currPage - 1))
             .limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents.map(doc => {
      return { id: doc._id,  title: doc.title,  content: doc.content, imagePath: doc.imagePath, creator: doc.creator }
    })
    return POST.countDocuments();
  }).then(count =>{
    res.status(200).json({
      message: 'Posts fetch successfully',
      posts: fetchedPosts,
      count: count
    });
  })
  .catch(error => {
    res.status(500).json({ message: 'Fetching posts failed!' });
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
