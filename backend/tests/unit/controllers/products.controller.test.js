const chai = require('chai');
const sinon = require('sinon');
const mockProducts = require('../../mock');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');

const { expect } = chai;

describe('Product Controller', function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });
  
  afterEach(function () {
    sandbox.restore();
  });

  describe('listAllProducts', function () {
    it('deve retornar todos os produtos', async function () {
      const req = {};
      const res = {
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
     
      sandbox.stub(productService, 'getAllProducts').resolves(mockProducts);

      await productController.listAllProducts(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res.data).to.deep.equal(mockProducts);
    });

    it('deve tratar erros ao buscar produtos', async function () {
      const req = {};
      const res = {
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
    
      const error = new Error('Erro ao buscar produtos');
     
      sandbox.stub(productService, 'getAllProducts').rejects(error);
      
      await productController.listAllProducts(req, res);
     
      expect(res.statusCode).to.equal(500);
      expect(res.data).to.deep.equal({ error: 'Erro ao listar produtos.' });
    });
  });
});
