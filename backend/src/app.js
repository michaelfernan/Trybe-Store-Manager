const express = require('express');

const app = express();

app.use(express.json());

const productRoutes = require('./routers/routes');
 
app.use(productRoutes);

// Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
