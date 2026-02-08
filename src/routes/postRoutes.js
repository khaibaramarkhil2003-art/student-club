const express = require('express');
const router = express.Router();

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

const authMiddleware = require('../middleware/authMiddleware');

// Private routes
router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getPosts);
router.get('/:id', authMiddleware, getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
