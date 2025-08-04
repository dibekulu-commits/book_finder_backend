const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Book = sequelize.define('Book', {
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  genre: DataTypes.STRING,
  year: DataTypes.STRING,
  description: DataTypes.TEXT,
  coverImage: DataTypes.STRING,
});

module.exports = Book;
