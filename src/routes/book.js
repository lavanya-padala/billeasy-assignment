const express = require('express');
const {
  addBook,
  getAllBooks,
  getBookById,
  submitReview,
  updateReview,
  deleteReview,
  searchBooks
} = require('../controllers/book');
const protect = require('../middlewares/auth');
const router = express.Router();

router.post('/books', protect, addBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books/:id/reviews', protect, submitReview);
router.put('/reviews/:id', protect, updateReview);
router.delete('/reviews/:id', protect, deleteReview);
router.get('/search', searchBooks);

module.exports = router;
