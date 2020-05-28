const express = require('express');
const mysql = require('mysql');
const app = express();

// tentukan folder untuk image dan css
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// buat koneksi ke mysql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1992',
  database: 'progate'
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      console.log(results);
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO items (nama, harga) VALUES (? , ?)',
    [req.body.itemName, req.body.itemHarga],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  // Ketik code untuk memperbarui item yang dipilih
  connection.query(
    'UPDATE items SET nama= ?, harga= ? WHERE id= ?',
    [req.body.itemName , req.body.itemHarga , req.params.id],
    (error, results) => {
      res.redirect('/index');
    });
});

app.listen(3000);
