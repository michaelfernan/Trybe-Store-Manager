const express = require('express');
const productController = require('../controllers/productController');
const salesController = require('../controllers/salesController');
const mid = require('../middlewares/productsMiddlewares');

const router = express.Router();

router.get('/products', productController.listAllProducts);
router.get('/products/:id', productController.getProductById);

router.get('/sales', salesController.listAllSales);
router.get('/sales/:id', salesController.getSaleById);

router.post('/products', mid, productController.createProduct);

module.exports = router;
