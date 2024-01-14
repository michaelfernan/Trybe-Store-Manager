const mysql = require('mysql2/promise');
const dbConfig = require('../database/conection');

const saleQuery = `
    SELECT s.id as saleId, s.date, sp.product_id as productId, sp.quantity 
    FROM sales as s 
    INNER JOIN sales_products as sp ON s.id = sp.sale_id
    ORDER BY s.id, sp.product_id`;

const saleQueryById = `
    SELECT s.date, sp.product_id as productId, sp.quantity 
    FROM sales as s 
    INNER JOIN sales_products as sp ON s.id = sp.sale_id
    WHERE s.id = ?`;

const mapSales = (result) => result.map((row) => ({
  saleId: row.saleId,
  date: row.date,
  productId: row.productId,
  quantity: row.quantity,
}));

const getAllSales = async () => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [result] = await connection.execute(saleQuery);
    return mapSales(result);
  } catch (error) {
    throw new Error(`Erro ao obter todas as vendas: ${error.message}`);
  } finally {
    connection.end();
  }
};

const getSaleById = async (saleId) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [result] = await connection.execute(saleQueryById, [saleId]);
    return mapSales(result);
  } catch (error) {
    throw new Error(`Erro ao obter venda por ID: ${error.message}`);
  } finally {
    connection.end();
  }
};

const insertSales = async (saleId, productId, quantity) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const query = `
      INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`;
    await connection.execute(query, [saleId, productId, quantity]);
  } catch (error) {
    throw new Error(`Erro ao inserir venda: ${error.message}`);
  } finally {
    connection.end();
  }
};

const insertSalesDate = async () => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const query = `
      INSERT INTO sales (date)
      VALUES (NOW())`;
    const [result] = await connection.execute(query);
    
    if ('insertId' in result) {
      return result.insertId;
    }

    throw new Error('Falha ao inserir venda.');
  } catch (error) {
    throw new Error(`Erro ao inserir venda com data: ${error.message}`);
  } finally {
    connection.end();
  }
};

module.exports = { getAllSales, getSaleById, insertSales, insertSalesDate };
