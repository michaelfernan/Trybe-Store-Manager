const productModel = require('../models/productModel');

const getAllProducts = () => productModel.getAllProducts(); 

const getProductById = (id) => productModel.getProductById(id); 

const createProduct = async (name) => {
  const result = await productModel.createProduct(name);
  console.log(result);
  return result;
};

module.exports = { getAllProducts, getProductById, createProduct };