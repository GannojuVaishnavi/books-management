const express= require('express');
const app =express();
const bodyparser=require('body-parser');
const routes=require('./routes/books');
const port=3300;

app.use(bodyparser.json());
app.use(routes);

app.use(express.static('./public'));

app.listen(port,()=>{
console.log("listening to port 3300");
})



// -----------

app.post('/admin/create-user', async (req, res, next) => {
    try {
      const { username, password, isAdmin } = req.body;
  
      const query = 'INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)';
      const result = await db.query(query, [username, password, isAdmin]);
  
      res.json({ message: 'User created successfully' });
    } catch (err) {
      next(err);
    }
  });
  
  app.put('/admin/update-user/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { username, password, isAdmin } = req.body;
  
      const query = 'UPDATE users SET username=?, password=?, isAdmin=? WHERE id=?';
      const result = await db.query(query, [username, password, isAdmin, userId]);
  
      res.json({ message: 'User updated successfully' });
    } catch (err) {
      next(err);
    }
  });
  
  app.delete('/admin/delete-user/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId;
  
      const query = 'DELETE FROM users WHERE id=?';
      const result = await db.query(query, [userId]);
  
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      next(err);
    }
  });
  
  



//   /////
app.post('/user/request-book/:bookId', async (req, res, next) => {
    try {
      const userId = req.body.userId; // Assume userId is sent in the request body
      const bookId = req.params.bookId;
  
      // Check if the user has already requested the book
      const checkQuery = 'SELECT * FROM book_requests WHERE userId=? AND bookId=?';
      const checkResult = await db.query(checkQuery, [userId, bookId]);
  
      if (checkResult.length > 0) {
        res.status(400).json({ error: 'Book already requested by the user' });
      } else {
        // Create a new book request
        const insertQuery = 'INSERT INTO book_requests (userId, bookId, status) VALUES (?, ?, ?)';
        const insertResult = await db.query(insertQuery, [userId, bookId, 'pending']);
  
        res.json({ message: 'Book requested successfully' });
      }
    } catch (err) {
      next(err);
    }
  });
  
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
  