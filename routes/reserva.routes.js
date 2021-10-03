const express = require('express');
const ReservaRoutes = express.Router();

const ReservaController = require('../controllers/reserva.controller');

ReservaRoutes.get('/', ReservaController.principal);
ReservaRoutes.get('/buscar/:key/:value', ReservaController.buscar);
ReservaRoutes.get('/buscar/:id', ReservaController.buscarId);
ReservaRoutes.post('/nuevo', ReservaController.nuevo);
ReservaRoutes.put('/editar/:id', ReservaController.editar);
ReservaRoutes.delete('/eliminar/:id', ReservaController.eliminar);


module.exports = ReservaRoutes;