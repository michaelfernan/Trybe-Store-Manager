const express = require('express');
const productController = require('../controllers/productController');
const salesController = require('../controllers/salesController');
const mid = require('../middlewares/productsMiddlewares');
const midSales = require('../middlewares/salesMiddleware');
// const productExist = require('../middlewares/productsExist');

const router = express.Router();

router.get('/products', productController.listAllProducts);
router.get('/products/:id', productController.getProductById);

router.get('/sales', salesController.listAllSales);
router.get('/sales/:id', salesController.getSaleById);

router.post('/products', mid.checkProductName, productController.createProduct);
router.put(
  '/products/:id', 

  mid.validateProductUpdate,
  // productExist,
  productController.updateProduct,
);

router.post('/sales', midSales, salesController.insertSales);

module.exports = router;
