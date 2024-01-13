const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');

// Substitua com o seu mockSales real
const mockSales = [{ saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 }];

describe('Sales Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('listAllSales', function () {
    it('should return all sales', async function () {
      const req = {}; // Mock req object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      sinon.stub(salesService, 'getAllSales').resolves(mockSales);

      await salesController.listAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockSales);
    });
  });

  describe('getSaleById', function () {
    it('should return a specific sale by ID', async function () {
      const req = { params: { id: 1 } }; // Mock req object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      sinon.stub(salesService, 'getSaleById').withArgs(1).resolves([mockSales[0]]);

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([mockSales[0]]);
    });

    it('should return 404 for non-existing sale', async function () {
      const req = { params: { id: 999 } }; // Mock req object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      sinon.stub(salesService, 'getSaleById').withArgs(999).resolves([]);

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
  });
});
