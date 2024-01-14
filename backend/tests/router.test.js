const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

const { assert } = chai;

chai.use(chaiHttp);

describe('Product and Sales Routes', function () {
  it('should list all products', function (done) {
    chai.request(app)
      .get('/products')
      .end(function (err, res) {
        assert.equal(err, null);
        assert.isTrue(res.status === 200);
        assert.isArray(res.body);
        done();
      });
  });

  it('should get a product by ID', function (done) {
    chai.request(app)
      .get('/products/1')
      .end(function (err, res) {
        assert.equal(err, null);
        assert.isTrue(res.status === 200);
        assert.isObject(res.body);
        done();
      });
  });

  it('should list all sales', function (done) {
    chai.request(app)
      .get('/sales')
      .end(function (err, res) {
        assert.equal(err, null);
        assert.isTrue(res.status === 200);
        assert.isArray(res.body);
        done();
      });
  });

  it('should create a product', function (done) {
    chai.request(app)
      .post('/products')
      .send({ name: 'Test Product' })
      .end(function (err, res) {
        assert.equal(err, null);
        assert.isTrue(res.status === 201);
        assert.isObject(res.body);
        done();
      });
  });

  it('should update a product', function (done) {
    chai.request(app)
      .put('/products/1')
      .send({ name: 'Updated Product' })
      .end(function (err, res) {
        assert.equal(err, null);
        assert.isTrue(res.status === 200);
        assert.isObject(res.body);
        done();
      });
  });
});
