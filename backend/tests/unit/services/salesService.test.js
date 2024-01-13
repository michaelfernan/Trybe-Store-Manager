const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const SalesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');

describe('Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getAllSales', function () {
    it('should retrieve all sales', async function () {
      const mockSales = [{ saleId: 1 }, { saleId: 2 }];
      sinon.stub(SalesModel, 'getAllSales').resolves(mockSales);

      const sales = await salesService.getAllSales();

      expect(sales).to.deep.equal(mockSales);
    });
  });

  describe('getSaleById', function () {
    it('should retrieve a sale by ID', async function () {
      const mockSale = { saleId: 1 };
      sinon.stub(SalesModel, 'getSaleById').withArgs(1).resolves(mockSale);

      const sale = await salesService.getSaleById(1);

      expect(sale).to.deep.equal(mockSale);
    });
  });
});
