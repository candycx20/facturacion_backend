const { Router } = require('express');
const router = Router();

const UsuarioController = require('../controllers/UsuarioController');

module.exports = (app) => {
     router.get('/usuario/get', UsuarioController.get);
}