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

module.exports = { getAllSales, getSaleById };