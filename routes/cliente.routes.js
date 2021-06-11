const express = require('express');
const auth = require('../middleware/auth');
const ClienteRoutes = express.Router();

const ClienteController = require('../controllers/cliente.controller');

// de acceso privado
ClienteRoutes.get('/', auth, ClienteController.principal );//Busca a todos
ClienteRoutes.get('/buscar', auth, ClienteController.buscar );//Busca uno
ClienteRoutes.put('/editar', auth, ClienteController.editar );//Editar info de cliente
ClienteRoutes.delete('/eliminar', auth, ClienteController.eliminar );//Eliminar al cliente


//----------------------------------------------------------------
// de acceso publico
ClienteRoutes.post('/registro',  ClienteController.registro );//Crear un cliente
ClienteRoutes.post('/login',  ClienteController.login );//Logearse con un cliente



module.exports = ClienteRoutes;