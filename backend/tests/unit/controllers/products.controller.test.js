const chai = require('chai');
const sinon = require('sinon');
const mockProducts = require('../../mock');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');

const { expect } = chai;

describe('Product Controller', function () {
  let sandbox;
  let req;
  let res;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    req = {};
    res = { 
      statusCode: 0,
      data: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.data = data;
      },
    };
  });
  
  afterEach(function () {
    sandbox.restore();
  });

  describe('listAllProducts', function () {
    it('deve retornar todos os produtos', async function () {
      sandbox.stub(productService, 'getAllProducts').resolves(mockProducts);

      await productController.listAllProducts(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res.data).to.deep.equal(mockProducts);
    });

    it('deve tratar erros ao buscar produtos', async function () {
      const error = new Error('Erro ao buscar produtos');
      sandbox.stub(productService, 'getAllProducts').rejects(error);
      
      await productController.listAllProducts(req, res);
     
      expect(res.statusCode).to.equal(500);
      expect(res.data).to.deep.equal({ error: 'Erro ao listar produtos.' });
    });
  });
  describe('getProductById', function () {
    it('deve retornar um produto pelo ID', async function () {
      const mockProduct = { id: 1, name: 'Produto Teste', price: 10 };
      const productId = 1;

      req.params = { id: productId };
      sandbox.stub(productService, 'getProductById').resolves(mockProduct);

      await productController.getProductById(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res.data).to.deep.equal(mockProduct);
    });

    it('deve retornar 404 se o produto não for encontrado', async function () {
      const productId = 999; 

      req.params = { id: productId };
      sandbox.stub(productService, 'getProductById').resolves(null);

      await productController.getProductById(req, res);

      expect(res.statusCode).to.equal(404);
      expect(res.data).to.deep.equal({ message: 'Product not found' });
    });

    it('deve tratar erros ao buscar produto pelo ID', async function () {
      const productId = 1;
      const error = new Error('Erro ao buscar produto');

      req.params = { id: productId };
      sandbox.stub(productService, 'getProductById').rejects(error);

      await productController.getProductById(req, res);

      expect(res.statusCode).to.equal(500);
      expect(res.data).to.deep.equal({ error: 'Erro ao buscar produto.' });
    });
  });

  describe('createProduct', function () {
    it('deve criar um produto com sucesso', async function () {
      const mockProduct = { name: 'Produto Novo' };
      req.body = mockProduct;
      sandbox.stub(productService, 'createProduct').resolves(mockProduct);

      await productController.createProduct(req, res);

      expect(res.statusCode).to.equal(201);
      expect(res.data).to.deep.equal(mockProduct);
    });

    it('deve tratar erros ao criar um produto', async function () {
      const error = new Error('Erro ao criar produto');
      req.body = { name: 'Produto Novo' };
      sandbox.stub(productService, 'createProduct').rejects(error);

      await productController.createProduct(req, res);

      expect(res.statusCode).to.equal(500);
      expect(res.data).to.deep.equal({ error: 'Erro ao criar produto.' });
    });
  });
});
