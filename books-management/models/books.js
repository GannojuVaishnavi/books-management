const config = require("../config/config.js");
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
    return;
  }
  console.log('Connected to the database');
});


function modelcreateBook (book, callback)  {
    db.query(
      `INSERT INTO bookslist (title, author, genre,publication_year) VALUES ('${book.title}', '${book.author}', '${book.genre}',${book.publication_year})`,
      callback
  );
};

function modelgetAllBooks (callback) {
    db.query('SELECT * FROM bookslist', callback);
};
  
function modelgetBookById  (bookId, callback) {
    db.query('SELECT * FROM bookslist WHERE id = ?', bookId, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result[0]);
    });
};

function modelupdateBook (bookId, updatedBook, callback) {
  db.query('UPDATE bookslist SET ? WHERE id = ?', [updatedBook, bookId], callback);
};
 
function modeldeleteBook (bookId, callback){
  db.query('DELETE FROM bookslist WHERE id = ?', bookId, callback);
};
exports.modeldeleteBook=modeldeleteBook;
exports.modelgetAllBooks=modelgetAllBooks;
exports.modelcreateBook=modelcreateBook;
exports.modelupdateBook=modelupdateBook;
exports.modelgetBookById=modelgetBookById;



