const productService = require('../services/productService');

const listAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos.' });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.getProductById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto.' });
  }
};

module.exports = { listAllProducts, getProductById };
