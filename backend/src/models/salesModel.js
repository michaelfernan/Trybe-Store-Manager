const mysql = require('mysql2/promise');
const dbConfig = require('../database/conection');

const salequery = `
    SELECT s.id as saleId, s.date, sp.product_id as productId, sp.quantity 
    FROM sales as s 
    INNER JOIN sales_products as sp ON s.id = sp.sale_id
    ORDER BY s.id, sp.product_id`;

const salequeryid = `
  SELECT s.date, sp.product_id as productId, sp.quantity 
  FROM sales as s 
  INNER JOIN sales_products as sp ON s.id = sp.sale_id
  WHERE s.id = ? `;
    
const maps = (result) => result.map((row) => ({
  saleId: row.saleId,
  date: row.date,
  productId: row.productId,
  quantity: row.quantity,
}));
    
const getAllSales = async () => {
  const connection = await mysql.createConnection(dbConfig);
  const query = salequery;
  const [result] = await connection.execute(
    query,
  );
  const response = maps(result);
  console.log(response);
  return response; 
};
  
const getSaleById = async (salesId) => {
  const connection = await mysql.createConnection(dbConfig);
  const query = salequeryid;
  const [result] = await connection.execute(query, [salesId]);
  return result; 
};
  
module.exports = { getAllSales, getSaleById };
