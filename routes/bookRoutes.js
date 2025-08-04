const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

router.get('/search', controller.searchBooks);
router.get('/favorites', controller.getFavorites);
router.post('/favorites', controller.addFavorite);
router.delete('/favorites/:id', controller.removeFavorite);

module.exports = router;
