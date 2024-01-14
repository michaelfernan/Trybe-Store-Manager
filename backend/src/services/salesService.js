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
  console.log(itemsSold);
  const saleItems = await Promise.all(
    itemsSold.map(async (item) => SalesModel
      .insertSales(saleId, item.productId, item.quantity)),
  );
  console.log('service', saleId, saleItems);
  return {
    id: saleId,
    itemsSold: saleItems,
  };
};

module.exports = { getAllSales, getSaleById, createSale };
