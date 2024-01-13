const salesService = require('../services/salesService');

const listAllSales = async (req, res) => {
  try {
    const sales = await salesService.getAllSales();
    console.log('controller', sales);
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSaleById = async (req, res) => {
  try {
    const saleId = parseInt(req.params.id, 10);
    const sale = await salesService.getSaleById(saleId);
    console.log('service', sale);

    if (Array.isArray(sale) && sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    
    res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  listAllSales,
  getSaleById,
};
