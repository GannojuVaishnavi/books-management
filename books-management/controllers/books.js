const db=require('../models/books');


exports.createBook = (req, res) => {
    const book= req.body;
  
    db.modelcreateBook(book, (err)=>{
      if (err) {
        console.error('Error creating book', err);
        res.status(500).send('Error creating book');
        return;
      }
      res.status(201).send('book created successfully');
    });
  };
  
  exports.getAllBooks = (req, res) => {
    db.modelgetAllBooks((err, books) => {
      if (err) {
        console.error('Error getting books', err);
        res.status(500).send('Error getting books');
        return;
      }
      res.send(books);
    });
  };
  
exports.getBookById = (req, res) => {
    const bookId = req.params.id; 
db.modelgetBookById(bookId, (err, book) => {
      if (err) {
        console.error('Error getting book', err);
        res.status(500).send('Error getting book');
        return;
      }

      if (!book) {
        res.status(404).send('Book not found');
        return;
      }
      res.send(book);
    });
  };
  
exports.updateBook = (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
  
    db.modelupdateBook(bookId, updatedBook, (err, result) => {
      if (err) {
        console.error('Error updating book', err);
        res.status(500).send('Error updating book');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('book not found');
        return;
      }
      res.send('book updated successfully');
    });
  };
  
  exports.deleteBook = (req, res) => {
    const bookId = req.params.id;
  
    db.modeldeleteBook(bookId, (err, result) => {
      if (err) {
        console.error('Error deleting book', err);
        res.status(500).send('Error deleting book');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('book not found');
        return;
      }
      res.send('book deleted successfully');
    });
  };  
  