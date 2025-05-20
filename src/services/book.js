const BookModel = require('../models/book');

exports.createBook = async (data) => {
  return await BookModel.create(data);
};

exports.fetchAllBooks = async ({ page = 1, limit = 10, author, genre }) => {
  const query = {};
  if (author) query.author = new RegExp(author, 'i');
  if (genre) query.genre = new RegExp(genre, 'i');

  const books = await BookModel.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await BookModel.countDocuments(query);

  return { total, books };
};

exports.fetchBookById = async (id, { page = 1, limit = 5 }) => {
  const book = await BookModel.findById(id).populate('reviews.user', 'username');
  if (!book) throw new Error('Book not found');

  const averageRating = book.reviews.length
    ? book.reviews.reduce((x, review) => x + review.rating, 0) / book.reviews.length
    : 0;

  const startIndex = (page - 1) * limit;
  const paginatedReviews = book.reviews.slice(startIndex, startIndex + parseInt(limit));

  return {
    book: {
      _id: book._id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    },
    reviews: paginatedReviews,
    totalReviews: book.reviews.length,
    currentPage: parseInt(page),
    totalPages: Math.ceil(book.reviews.length / parseInt(limit)),
    averageRating,
  };
};

exports.addReview = async (bookId, userId, { rating, comment }) => {
  const book = await BookModel.findById(bookId);
  if (!book) throw new Error('Book not found');

  const existingReview = book.reviews.find(r => r.user.toString() === userId.toString());
  if (existingReview) throw new Error('You have already reviewed this book');

  book.reviews.push({ user: userId, rating, comment });
  await book.save();
  return { message: 'Review submitted successfully' };
};

exports.modifyReview = async (bookId, userId, { rating, comment }) => {
  const book = await BookModel.findById(bookId);
  if (!book) throw new Error('Book not found');

  const review = book.reviews.find(r => r.user.toString() === userId.toString());
  if (!review) throw new Error('Review not found');

  review.rating = rating;
  review.comment = comment;
  await book.save();
  return { message: 'Review updated successfully' };
};

exports.removeReview = async (bookId, userId) => {
  const book = await BookModel.findById(bookId);
  if (!book) throw new Error('Book not found');

  book.reviews = book.reviews.filter(r => r.user.toString() !== userId.toString());
  await book.save();
  return { message: 'Review deleted successfully' };
};

exports.searchBooks = async (query) => {
  return await BookModel.find({
    $or: [
      { title: new RegExp(query, 'i') },
      { author: new RegExp(query, 'i') },
    ],
  });
};
