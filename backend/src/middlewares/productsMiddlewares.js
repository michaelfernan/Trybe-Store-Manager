function checkProductName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'O nome do produto é obrigatório.' });
  }
  next(); 
}

module.exports = checkProductName;
