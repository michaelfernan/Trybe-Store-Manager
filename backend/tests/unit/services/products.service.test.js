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
});
