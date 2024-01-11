const productModel = require('../models/productModel');

const getAllProducts = () => productModel.getAllProducts(); 

const getProductById = (id) => productModel.getProductById(id); 

module.exports = { getAllProducts, getProductById };
