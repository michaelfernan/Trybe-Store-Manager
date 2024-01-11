const { expect } = require('chai');
const sinon = require('sinon');
const mysql = require('mysql2/promise');
const productModel = require('../../../src/models/productModel');

describe('Product Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getAllProducts - Deve retornar todos os produtos', async function () {
    const fakeProducts = [{ id: 1, name: 'Product 1' }];
    const connectionStub = { query: sinon.stub().resolves([fakeProducts]), end: sinon.stub() };

    sinon.stub(mysql, 'createConnection').resolves(connectionStub);

    const products = await productModel.getAllProducts();

    expect(products).to.deep.equal(fakeProducts);
  });
});
