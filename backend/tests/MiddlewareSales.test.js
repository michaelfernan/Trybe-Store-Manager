const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../src/app');
const productModel = require('../src/models/productModel');

const { assert } = chai;

chai.use(chaiHttp);

describe('Middleware validateSales', function () {
  let productExistsStub;

  beforeEach(function () {
    productExistsStub = sinon.stub(productModel, 'productExists');
  });

  afterEach(function () {
    productExistsStub.restore();
  });

  // Teste para verificar se 'productId' está faltando
  it('should return 400 for missing productId', function (done) {
    const salesData = [{ quantity: 5 }];

    chai.request(app)
      .post('/sales')
      .send(salesData)
      .end(function (err, res) {
        assert.equal(err, null);
        assert.equal(res.status, 400);
        assert.equal(res.body.message, '"productId" is required');
        done();
      });
  });

  // Teste para verificar se 'quantity' está faltando
  it('should return 400 for missing quantity', function (done) {
    const salesData = [{ productId: 1 }];

    chai.request(app)
      .post('/sales')
      .send(salesData)
      .end(function (err, res) {
        assert.equal(err, null);
        assert.equal(res.status, 400);
        assert.equal(res.body.message, '"quantity" is required');
        done();
      });
  });

  // Teste para verificar se 'quantity' é menor ou igual a zero
  it('should return 422 for quantity less than or equal to 0', function (done) {
    const salesData = [{ productId: 1, quantity: 0 }];

    chai.request(app)
      .post('/sales')
      .send(salesData)
      .end(function (err, res) {
        assert.equal(err, null);
        assert.equal(res.status, 422);
        assert.equal(res.body.message, '"quantity" must be greater than or equal to 1');
        done();
      });
  });

  // Teste para verificar se 'productId' não existe
  it('should return 404 for non-existing productId', function (done) {
    productExistsStub.withArgs(1).returns(true);
    productExistsStub.withArgs(999).returns(false);

    const salesData = [{ productId: 999, quantity: 3 }];

    chai.request(app)
      .post('/sales')
      .send(salesData)
      .end(function (err, res) {
        assert.equal(err, null);
        assert.equal(res.status, 404);
        assert.equal(res.body.message, 'Product not found');
        done();
      });
  });
});
