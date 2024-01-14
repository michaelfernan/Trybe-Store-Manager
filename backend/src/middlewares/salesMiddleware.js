const productsModel = require('../models/productModel');

const validateSales = async (req, res, next) => {
  const sales = req.body;
  const validateProducts = sales.some((sale) => !sale.productId);
  const validatesQuantitys = sales.some((sale) => sale.quantity === undefined);
  const validatesQuantitysValue = sales.some((sale) => sale.quantity <= Number(0));
  if (validatesQuantitysValue) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (validateProducts) { 
    return res.status(400).json({ message: '"productId" is required' });
  } if (validatesQuantitys) {
    return res.status(400).json({ message: '"quantity" is required' });
  } const productExists = await productsModel
    .productExists(sales.productId); 
  if (!productExists) {
    return res.status(404).json({ message: 'Product not found' });
  } return next();
};

module.exports = validateSales;