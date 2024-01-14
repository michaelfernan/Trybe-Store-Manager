const SalesModel = require('../models/salesModel');

const getAllSales = async () => {
  const result = await SalesModel.getAllSales(); 
  console.log('service result', result); 
  return result;
};

const getSaleById = async (id) => {
  const result = await SalesModel.getSaleById(id); 
  console.log('service', result);
  return result;
};

const createSale = async (itemsSold) => {
  const saleId = await SalesModel.insertSalesDate();
 
  const saleItems = await Promise.all(
    itemsSold.map(async (item) => SalesModel
      .insertSales(saleId, item.productId, item.quantity)),
  );
  return {
    id: saleId,
    itemsSold: saleItems,
  };
};
const insertSales = async (req, res) => {
  try {
    const itemsSold = req.body;
    const newSale = await createSale(itemsSold); 
    res.status(201).json(newSale); 
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ error: 'Erro ao criar venda.' });
  }
};

module.exports = { getAllSales, getSaleById, insertSales };
