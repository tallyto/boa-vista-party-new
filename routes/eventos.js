// Express
const { Router } = require('express');

const routes = Router();

const Eventos = require('../models/eventoSchema');

// Rotas
routes.get('/', async (req, res) => {
  const eventos = await Eventos.find();
  res.render('eventos', { eventos, title: 'Boa Vista Party - Eventos' });
});

module.exports = routes;
