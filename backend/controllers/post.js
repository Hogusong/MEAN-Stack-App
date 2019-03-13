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
  // const url = req.protocol + '://' + req.get('host');  // need when deploy
  const url = 'backend'
  const post = new POST({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(data => {
    res.status(201).json({
      post: {
        ...data,
        id: data._id
      },
      message: 'Post added successfully'
    });
  })
  .catch(error => {
    res.status(500).json({ message: 'Creating a post failed!'});
  })
}

exports.deletePost =  (req, res, next) => {
  POST.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Deleted successfully!' });
      } else {
        res.status(200).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Couldn\'t delete post!' });
    });
}
