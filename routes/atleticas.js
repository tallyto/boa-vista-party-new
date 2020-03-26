// Express
const { Router } = require('express');

const routes = Router();

const Atleticas = require('../models/atleticaSchema');

// Routes
routes.get('/', async (req, res) => {
  const atleticas = await Atleticas.find().sort({ title: 1 });
  res.render('atleticas', { atleticas, title: 'Atléticas' });
});


module.exports = routes;
