const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../src/services/productService');
const productsModel = require('../../../src/models/productModel');
const mockProducts = require('../../mock');

describe('Product Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getAllProducts - Deve retornar todos os produtos', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(mockProducts);

    const products = await productService.getAllProducts();
    expect(products).to.deep.equal(mockProducts);
  });

  it('getProductById - Deve retornar um produto por ID válido', async function () {
    const productId = 1;
    const mockProduct = mockProducts.find((product) => product.id === productId);
    sinon.stub(productsModel, 'getProductById').resolves(mockProduct);

    const product = await productService.getProductById(productId);
    expect(product).to.deep.equal(mockProduct);
  });

  it('getProductById - Deve lançar erro quando o produto não for encontrado', async function () {
    const productId = 999; 
    sinon.stub(productsModel, 'getProductById').resolves(null);
  
    try {
      await productService.getProductById(productId);
  
      expect.fail('Product not found');
    } catch (error) {
      expect(error.message).to.equal('Product not found'); 
    }
  });

  it('createProduct - Deve criar um novo produto', async function () {
    const newProduct = { name: 'Novo Produto' };
    const createdProduct = { id: 999, name: newProduct.name }; 
    sinon.stub(productsModel, 'createProduct').resolves(createdProduct);

    const result = await productService.createProduct(newProduct.name);
    expect(result).to.deep.equal(createdProduct);
  });

  it('updateProduct - Deve atualizar um produto existente', async function () {
    const productId = 1;
    const updatedName = 'Produto Atualizado';
    const mockProduct = mockProducts.find((product) => product.id === productId);
    sinon.stub(productsModel, 'getProductById').resolves(mockProduct);
    sinon.stub(productsModel, 'updateProduct').resolves({ ...mockProduct, name: updatedName });

    const result = await productService.updateProduct(productId, updatedName);
    expect(result.name).to.equal(updatedName);
  });

  it('updateProduct - Deve lançar erro quando o produto não for encontrado', async function () {
    const productId = 999; 
    const updatedName = 'Produto Atualizado';
    sinon.stub(productsModel, 'getProductById').resolves(null);

    try {
      await productService.updateProduct(productId, updatedName);
   
      expect.fail('A função deveria lançar um erro.');
    } catch (error) {
      expect(error.status).to.equal(404);
      expect(error.message).to.equal('Product not found');
    }
  });

  it('deleteProduct - Deve excluir um produto existente', async function () {
    const productId = 1;
    const mockProduct = mockProducts.find((product) => product.id === productId);
    sinon.stub(productsModel, 'getProductById').resolves(mockProduct);
    sinon.stub(productsModel, 'deleteProduct').resolves(1); 

    const result = await productService.deleteProduct(productId);
    expect(result).to.equal(1);
  });

  it('deleteProduct - Deve lançar erro quando o produto não for encontrado', async function () {
    const productId = 999; 
    sinon.stub(productsModel, 'getProductById').resolves(null);

    try {
      await productService.deleteProduct(productId);
      
      expect.fail('A função deveria lançar um erro.');
    } catch (error) {
      expect(error.status).to.equal(404);
      expect(error.message).to.equal('Product not found');
    }
  });
});
