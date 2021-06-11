const express = require('express');
const ReservaRoutes = express.Router();

const ReservaController = require('../controllers/reserva.controller');

ReservaRoutes.get('/', ReservaController.principal);
ReservaRoutes.get('/buscar', ReservaController.buscar);

ReservaRoutes.post('/nuevo', ReservaController.nuevo);
ReservaRoutes.put('/editar', ReservaController.editar);
ReservaRoutes.delete('/eliminar', ReservaController.eliminar);


module.exports = ReservaRoutes;