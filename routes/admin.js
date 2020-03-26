// Express
const { Router } = require('express');

const routes = Router();

// Controllers
const multer = require('multer');
const AtleticaController = require('../controllers/AtleticaController');
const EventosController = require('../controllers/EventosController');

// Multer
const multerConfig = require('../config/multer');

// Helpers
const { eAdmin } = require('../helpers/eAdmin');

// Rotas protegidas por login
routes.use(eAdmin);

// Rotas
routes.get('/', (req, res) => {
  res.render('admin/index', { title: 'Painel Administrativo' });
});

// Evento
routes.get('/eventos', EventosController.listarEventos);
routes.post(
  '/cadastrar/evento',
  multer(multerConfig).single('file'),
  EventosController.cadastrarEvento,
);
routes.post('/editar/evento', EventosController.editarEvento);
routes.get('/deletar/evento/:id', EventosController.deletarEvento);

// Atleticas
routes.get('/atleticas', AtleticaController.listarAtleticas);
routes.post('/cadastrar/atletica',
  multer(multerConfig).single('file'),
  AtleticaController.cadastrarAtletica);
routes.post('/editar/atletica', AtleticaController.editarAtletica);
routes.get('/deletar/atletica/:id', AtleticaController.deletarAtletica);

module.exports = routes;
