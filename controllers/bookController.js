const { Book, User } = require('../models');
const { Op } = require('sequelize');

exports.searchBooks = async (req, res) => {
  const { q, title, author, genre } = req.query;
  const where = {};
  if (q) where.title = { [Op.like]: `%${q}%` };
  if (title) where.title = title;
  if (author) where.author = author;
  if (genre) where.genre = genre;

  try {
    const books = await Book.findAll({ where });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};

exports.getFavorites = async (req, res) => {
  const user = await User.findByPk(1, { include: Book });
  res.json(user.Books);
};

exports.addFavorite = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = await User.findByPk(1);
    const book = await Book.findByPk(bookId);

    if (!user || !book) {
      return res.status(404).json({ error: 'User or Book not found' });
    }

    await user.addBook(book);

    res.status(201).json(book); // ✅ return full book object
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeFavorite = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(1);
  const book = await Book.findByPk(id);
  await user.removeBook(book);
  res.json({ message: 'Removed from favorites' });
};
