const express = require('express');
const ClienteRoutes = express.Router();

const ClienteController = require('../controllers/cliente.controller');

// de acceso privado
ClienteRoutes.get('/', ClienteController.principal );//Busca a todos
ClienteRoutes.get('/buscar/:key/:value', ClienteController.buscar );//Busca uno
ClienteRoutes.get('/buscar/:id', ClienteController.buscarId );
ClienteRoutes.put('/editar', ClienteController.editar );//Editar info de cliente
ClienteRoutes.delete('/eliminar', ClienteController.eliminar );//Eliminar al cliente


//----------------------------------------------------------------
// de acceso publico
ClienteRoutes.post('/registro',  ClienteController.registro );//Crear un cliente
ClienteRoutes.post('/login',  ClienteController.login );//Logearse con un cliente



module.exports = ClienteRoutes;