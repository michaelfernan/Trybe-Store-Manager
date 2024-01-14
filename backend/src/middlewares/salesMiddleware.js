const productModel = require('../models/productModel');

const validateSales = async (req, res, next) => {
  try {
    const sales = req.body;

    if (sales.some((sale) => !sale
      .productId || sale.quantity === undefined || sale.quantity <= 0)) {
      return res.status(400).json({ message: 'Invalid sales data' });
    }
  
    const productIds = sales.map((sale) => sale.productId);
    const productsExist = await Promise
      .all(productIds.map((productId) => productModel.productExists(productId)));
    
    if (productsExist.some((productExists) => !productExists)) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = validateSales;
