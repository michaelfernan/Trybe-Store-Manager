const { expect } = require('chai');
const sinon = require('sinon');
const mysql = require('mysql2/promise');
const salesModel = require('../../../src/models/salesModel');

describe('Sales Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getAllSales - Deve retornar todas as vendas', async function () {
    const fakeSales = [
      { saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
      { saleId: 1, date: '2021-09-09T04:54:54.000Z', productId: 2, quantity: 2 },
    ];
    const connectionStub = { execute: sinon.stub().resolves([fakeSales]), end: sinon.stub() };

    sinon.stub(mysql, 'createConnection').resolves(connectionStub);

    const sales = await salesModel.getAllSales();

    expect(sales).to.deep.equal(fakeSales);
  });
  it('getSaleById - Deve retornar uma venda específica', async function () {
    const fakeSale = [
      { date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
    ];
    const connectionStub = { execute: sinon.stub().resolves([fakeSale]), end: sinon.stub() };

    sinon.stub(mysql, 'createConnection').resolves(connectionStub);
  });

  it('getSaleById - Deve retornar vazio para uma venda não existente', async function () {
    const connectionStub = { execute: sinon.stub().resolves([[]]), end: sinon.stub() };

    sinon.stub(mysql, 'createConnection').resolves(connectionStub);

    const sale = await salesModel.getSaleById(999);

    expect(sale).to.deep.equal([]);
  });

  it('insertSales - Deve inserir uma venda com sucesso', async function () {
    const fakeInsertId = 1;
    const connectionStub = {
      execute: sinon.stub().resolves([{ insertId: fakeInsertId }]),
      end: sinon.stub(),
    };

    sinon.stub(mysql, 'createConnection').resolves(connectionStub);
  });

  it('insertSalesDate - Deve inserir data de venda com sucesso', async function () {
    const fakeInsertId = 1;
    const connectionStub = {
      execute: sinon.stub().resolves([{ insertId: fakeInsertId }]),
      end: sinon.stub(),
    };

    sinon.stub(mysql, 'createConnection').resolves(connectionStub);

    const insertId = await salesModel.insertSalesDate();

    expect(insertId).to.equal(fakeInsertId);
  });
});
