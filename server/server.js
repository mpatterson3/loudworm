const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ limit:"10mb" }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'appuser',
  password: 'apppassword',
  database: 'appointments',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Get all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get a single product
app.get('/api/products/:id', (req, res) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(results[0]);
  });
});

// Create a new product
app.post('/api/products', (req, res) => {
  const { name, price, description, image } = req.body;
  db.query(
    'INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)',
    [name, price, description, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, price, description, image });
    }
  );
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const { name, price, description, image } = req.body;
  db.query(
    'UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?',
    [name, price, description, image, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: req.params.id, name, price, description, image });
    }
  );
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
