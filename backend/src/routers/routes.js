const express = require('express');
const productController = require('../controllers/productController');
const salesController = require('../controllers/salesController');
const mid = require('../middlewares/productsMiddlewares');
const midSales = require('../middlewares/salesMiddleware');
const productModel = require('../models/productModel');
// const productExist = require('../middlewares/productsExist');

const router = express.Router();

router.get('/products', productController.listAllProducts);
router.get('/products/:id', productController.getProductById);

router.get('/sales', salesController.listAllSales);
router.get('/sales/:id', salesController.getSaleById);

router.post('/products', mid.checkProductName, productController.createProduct);
router.put('/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    } const existingProduct = await productModel.getProductById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    } const updatedProduct = await productModel.updateProduct(productId, name);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Erro ao atualizar o produto.' });
  }
});

router.post('/sales', midSales, salesController.insertSales);

module.exports = router;
