const express = require('express');
const ClienteRoutes = express.Router();
const auth = require('../middleware/auth');
const ClienteController = require('../controllers/cliente.controller');

// de acceso privado
ClienteRoutes.get('/', auth, ClienteController.principal );//Busca a todos
ClienteRoutes.get('/buscar/:key/:value', auth, ClienteController.buscar );//Busca uno
ClienteRoutes.get('/buscar/:id', auth, ClienteController.buscarId );
ClienteRoutes.put('/editar:id', auth, ClienteController.editar );//Editar info de cliente
ClienteRoutes.delete('/eliminar:id', auth, ClienteController.eliminar );//Eliminar al cliente


//----------------------------------------------------------------
// de acceso publico
ClienteRoutes.post('/registro',  ClienteController.registro );//Crear un cliente
ClienteRoutes.post('/login',  ClienteController.login );//Logearse con un cliente



module.exports = ClienteRoutes;