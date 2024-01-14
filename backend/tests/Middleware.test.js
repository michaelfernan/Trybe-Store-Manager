const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const { checkProductName, validateProductUpdate } = require('../src/middlewares/productsMiddlewares');

chai.use(require('sinon-chai'));

describe('Middleware Tests', function () {
  let req; let res; let 
    next;

  beforeEach(function () {
    req = { body: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.spy();
  });

  describe('checkProductName', function () {
    it('deve chamar next se o nome é válido', function () {
      req.body.name = 'Produto Válido';

      checkProductName(req, res, next);
    });

    it('deve retornar 400 se o nome não é fornecido', function () {
      checkProductName(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('deve retornar 422 se o nome é muito curto', function () {
      req.body.name = 'Cur';

      checkProductName(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('validateProductUpdate', function () {
    it('deve chamar next se o nome é válido', function () {
      req.body.name = 'Produto Atualizado';

      validateProductUpdate(req, res, next);
    });

    it('deve retornar 400 se o nome não é fornecido', function () {
      validateProductUpdate(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('deve retornar 422 se o nome é muito curto', function () {
      req.body.name = 'Cur';

      validateProductUpdate(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });
});
