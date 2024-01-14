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

  it('should return 400 for invalid sales data - missing productId', function (done) {
    const invalidSales = [
      { productId: 1, quantity: 5 },
      { quantity: 3 }, 
      { productId: 2, quantity: -1 },
    ];

    chai.request(app)
      .post('/sales')
      .send(invalidSales)
      .end(function (err, res) {
        assert.equal(err, null);
        assert.isTrue(res.status === 400); 
        assert.equal(res.body.message, 'Invalid sales data'); 
        done();
      });
  });

  it('should return 400 for invalid sales data - negative quantity', function (done) {
    const invalidSales = [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: -1 }, 
    ];

    chai.request(app)
      .post('/sales')
      .send(invalidSales)
      .end(function (err, res) {
        assert.equal(err, null);
        assert.isTrue(res.status === 400); 
        assert.equal(res.body.message, 'Invalid sales data'); 
        done();
      });
  });

  it('should return 404 for non-existing products', function (done) {
    productExistsStub.returns(false); 

    const invalidSales = [
      { productId: 1, quantity: 5 },
      { productId: 999, quantity: 3 }, 
    ];

    chai.request(app)
      .post('/sales')
      .send(invalidSales)
      .end(function (err, res) {
        assert.equal(err, null);
        assert.isTrue(res.status === 404); 
        assert.equal(res.body.message, 'Product not found'); 
        done();
      });
  });
});
