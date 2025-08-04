require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models'); // Ensure this imports correctly
const bookRoutes = require('./routes/bookRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);

// Test connection before syncing
sequelize.authenticate()
  .then(() => console.log(' MySQL connection established.'))
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Stop the server if DB connection fails
  });

// Then sync the models
sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
