const bookService = require('../services/book');

exports.addBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const result = await bookService.fetchAllBooks(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const result = await bookService.fetchBookById(req.params.id, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitReview = async (req, res) => {
  try {
    const result = await bookService.addReview(req.params.id, req.user._id, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const result = await bookService.modifyReview(req.params.id, req.user._id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const result = await bookService.removeReview(req.params.id, req.user._id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const books = await bookService.searchBooks(req.query.query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
