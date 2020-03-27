const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const helmet = require('helmet');
const compression = require('compression');

// Autenticação
const passport = require('passport');
require('./config/auth')(passport);

// MongoDB
const path = require('path');
const MongoDB = require('./config/mongoDB');

// Rotas
const Atleticas = require('./routes/atleticas');
const Eventos = require('./routes/eventos');
const Admin = require('./routes/admin');
const User = require('./routes/user');
const EventosSechema = require('./models/eventoSchema');


class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.db();
    this.routes();
  }

  middlewares() {
    // Sessão
    this.server.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
      }),
    );

    // Middleware
    this.server.use(compression());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
    this.server.use(express.static(path.join(__dirname, 'public')));
    this.server.use(flash());
    this.server.use(cookieParser());
    this.server.use(helmet());


    // Auth
    this.server.use(passport.initialize());
    this.server.use(passport.session());

    // Variaveis global
    this.server.use((req, res, next) => {
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.title = req.flash('title');
      res.locals.user = req.user || null;
      next();
    });

    // Handlebars
    this.server.engine('handlebars', handlebars({ defaultLayout: 'main' }));
    this.server.set('view engine', 'handlebars');
  }

  db() {
    // MongoDB
    const Db = new MongoDB();
    Db.ConnectProduction()
      .then(() => console.log('Conexão efefutada com o banco de dados'))
      .catch((error) => {
        console.log(`erro: ${error}`);
      });
  }

  routes() {
    // Rotas
    this.server.use('/atleticas', Atleticas);
    this.server.use('/eventos', Eventos);
    this.server.use('/admin', Admin);
    this.server.use('/usuario', User);

    this.server.get('/', async (req, res) => {
      const eventos = await EventosSechema.find();
      res.render('main', { eventos, title: 'Boa Vista Party - Seu site de eventos e ações acadêmicas em Boa Vista/RR' });
    });

    this.server.get('/contato', (req, res) => {
      const contato = { title: 'Contato' };
      res.render('contato/index', contato);
    });

    this.server.get('*', (req, res) => {
      const notFound = { title: 'Página não encontrada' };
      res.render('404', notFound);
    });
  }
}

module.exports = new App().server;
