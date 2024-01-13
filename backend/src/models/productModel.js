const mysql = require('mysql2/promise');
const dbConfig = require('../database/conection');

const getAllProducts = async () => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.query('SELECT * FROM products ORDER BY id ASC');
    return rows;
  } finally {
    connection.end();
  }
};

const getProductById = async (productId) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection
      .query('SELECT * FROM products WHERE id = ? LIMIT 1', [productId]);
    return rows[0];
  } finally {
    connection.end();
  }
};
const createProduct = async (name) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [result] = await connection.query('INSERT INTO products (name) VALUES (?)', [name]);
    const newProduct = { id: result.insertId, name };
    console.log(newProduct);
    return newProduct;
  } finally {
    connection.end();
  }
};

module.exports = { getAllProducts, getProductById, createProduct };
