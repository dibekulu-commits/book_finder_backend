const sequelize = require('../config/db');
const Book = require('./Book');
const User = require('./User');
const Favorite = require('./Favorite');

Book.belongsToMany(User, { through: Favorite });
User.belongsToMany(Book, { through: Favorite });

module.exports = { sequelize, Book, User, Favorite };
