const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.post('/books', booksController.createBook);
router.get('/books', booksController.getAllBooks);
router.get('/books/:id', booksController.getBookById);
router.put('/books/:id', booksController.updateBook);
router.delete('/books/:id', booksController.deleteBook);

module.exports = router;

