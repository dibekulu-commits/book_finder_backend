const { sequelize, Book, User } = require('../models');

const seed = async () => {
  await sequelize.sync({ force: true }); // 🔁 this drops and recreates tables

  // Create one default user
  await User.create({
    username: 'testuser',
    email: 'test@example.com',
  });

  // Add sample books
  await Book.bulkCreate([
    {
      title: 'Book One',
      author: 'Author A',
      genre: 'Fiction',
      year: '2001',
      description: 'A great book.',
      coverImage: 'https://via.placeholder.com/150',
    },
    {
      title: 'Book Two',
      author: 'Author B',
      genre: 'Sci-Fi',
      year: '2005',
      description: 'Another great book.',
      coverImage: 'https://via.placeholder.com/150',
    },
  ]);

  console.log('✅ Database seeded!');
  process.exit();
};

seed();
