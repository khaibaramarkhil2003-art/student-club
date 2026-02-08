const Post = require('../models/Post');

// =====================
// Create Post
// =====================
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      res.status(400);
      throw new Error('Title and content are required');
    }

    if (title.trim().length < 3) {
      res.status(400);
      throw new Error('Title must be at least 3 characters');
    }

    if (content.trim().length < 10) {
      res.status(400);
      throw new Error('Content must be at least 10 characters');
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user._id
    });

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================
// Get All Posts
// =====================
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================
// Get Single Post
// =====================
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'username email'
    );

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================
// Update Post
// =====================
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Authorization (Ownership)
    const isOwner = post.author.equals(req.user._id);
    if (!isOwner) {
      res.status(403);
      throw new Error('Access denied');
    }

    if (req.body.title && req.body.title.trim().length < 3) {
      res.status(400);
      throw new Error('Title must be at least 3 characters');
    }

    if (req.body.content && req.body.content.trim().length < 10) {
      res.status(400);
      throw new Error('Content must be at least 10 characters');
    }

    post.title = req.body.title?.trim() || post.title;
    post.content = req.body.content?.trim() || post.content;

    const updatedPost = await post.save();

    res.json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

// =====================
// Delete Post
// =====================
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Authorization (Ownership)
    const isOwner = post.author.equals(req.user._id);
    if (!isOwner) {
      res.status(403);
      throw new Error('Access denied');
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};
