const mongoose = require('mongoose');

const Usuario = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    eAdmin: {
      type: Number,
      default: 0,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('usuarios', Usuario);
