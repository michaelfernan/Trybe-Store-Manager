const productModel = require('../models/productModel');

const validateProductInSale = (sale) => {
  if (sale.productId === undefined) {
    return '"productId" is required';
  }
  if (sale.quantity === undefined) {
    return '"quantity" is required';
  }
  if (sale.quantity <= 0) {
    return '"quantity" must be greater than or equal to 1';
  }
  return null;
};

const validateSalesData = (sales) => sales
  .map(validateProductInSale).find((errorMessage) => errorMessage);

const checkProductsExistence = async (sales) => {
  const productExistenceChecks = sales.map((sale) => productModel.productExists(sale.productId));
  const productsExist = await Promise.all(productExistenceChecks);
  if (productsExist.some((exists) => !exists)) {
    return 'Product not found';
  }
  return null;
};

const validateSales = async (req, res, next) => {
  try {
    const sales = req.body;

    const salesDataError = validateSalesData(sales);
    if (salesDataError) {
      const statusCode = salesDataError.includes('required') ? 400 : 422;
      return res.status(statusCode).json({ message: salesDataError });
    }

    const productsExistenceError = await checkProductsExistence(sales);
    if (productsExistenceError) {
      return res.status(404).json({ message: productsExistenceError });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = validateSales;
