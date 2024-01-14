const { expect } = require('chai');
const sinon = require('sinon');
const mysql = require('mysql2/promise');
const productModel = require('../../../src/models/productModel');

describe('Product Model', function () {
  let connectionStub;

  beforeEach(function () {
    connectionStub = {
      query: sinon.stub(),
      end: sinon.stub(),
    };
    sinon.stub(mysql, 'createConnection').resolves(connectionStub);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('getAllProducts', function () {
    it('deve retornar todos os produtos', async function () {
      const fakeProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      connectionStub.query.resolves([fakeProducts]);

      const products = await productModel.getAllProducts();

      expect(products).to.be.deep.equal(fakeProducts);
    });
  });

  describe('getProductById', function () {
    it('deve retornar um produto específico', async function () {
      const fakeProduct = { id: 1, name: 'Product 1' };
      connectionStub.query.resolves([[fakeProduct]]);

      const product = await productModel.getProductById(1);

      expect(product).to.be.deep.equal(fakeProduct);
    });

    it('deve retornar undefined para um produto não existente', async function () {
      connectionStub.query.resolves([[]]);

      const product = await productModel.getProductById(999);

      expect(product).to.be.equal(undefined);
    });
  });
  describe('createProduct', function () {
    it('deve criar um novo produto', async function () {
      const fakeResult = { insertId: 1 };
      connectionStub.query.resolves([fakeResult]);
      const productName = 'New Product';

      const newProduct = await productModel.createProduct(productName);

      expect(newProduct).to.deep.equal({ id: 1, name: productName });
    });
  });

  describe('productExists', function () {
    it('deve retornar true se o produto existir', async function () {
      connectionStub.query.resolves([[{ id: 1 }]]);
      const productId = 1;

      const exists = await productModel.productExists(productId);

      expect(exists).to.equal(true);
    });

    it('deve retornar false se o produto não existir', async function () {
      connectionStub.query.resolves([[]]);
      const productId = 999;

      const exists = await productModel.productExists(productId);

      expect(exists).to.equal(false);
    });
  });
});
