const productService = require('../services/productService');

const listAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error listing products:', error);
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
    console.error(`Error fetching product with ID ${productId}:`, error);
    res.status(500).json({ error: 'Erro ao buscar produto.' });
  }
};
const createProduct = async (req, res) => {
  const { name } = req.body;
  console.log('body', req.body);
  try {
    console.log('name', name);
    const newProduct = await productService.createProduct(name);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Erro ao criar produto.' });
  }
};

module.exports = { listAllProducts, getProductById, createProduct };
