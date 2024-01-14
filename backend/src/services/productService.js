const productModel = require('../models/productModel');

const errMensage = (status, message) => ({ status, message });

const getAllProducts = () => productModel.getAllProducts(); 

const getProductById = (id) => productModel.getProductById(id); 

const createProduct = async (name) => {
  const result = await productModel.createProduct(name);
  console.log(result);
  return result;
};

const updateProduct = async (id, name) => {
  const result = await productModel.getProductById(id);
  if (!result) throw errMensage(404, 'Product not found');
  const response = await productModel.updateProduct(id, name);
  return response;
};

const deleteProduct = async (id) => {
  const result = await productModel.getProductById(id);
  if (!result) throw errMensage(404, 'Product not found');
  const response = await productModel.deleteProduct(id);
  if (response === undefined) throw errMensage(404, 'Can delete product');
  if (response === 0) throw errMensage(404, 'Product not found');
  return response;
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };