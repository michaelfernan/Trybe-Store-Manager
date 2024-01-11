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

module.exports = { getAllProducts, getProductById };
