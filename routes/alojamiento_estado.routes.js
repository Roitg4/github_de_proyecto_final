const express = require('express');
const EstadoAlojamientoRoutes = express.Router();

const EstadoAlojController = require('../controllers/alojamiento_estado.controller');

EstadoAlojamientoRoutes.get('/', EstadoAlojController.principal);
EstadoAlojamientoRoutes.get('/buscar', EstadoAlojController.buscar);

EstadoAlojamientoRoutes.post('/nuevo', EstadoAlojController.nuevo);
EstadoAlojamientoRoutes.put('/editar', EstadoAlojController.editar);
EstadoAlojamientoRoutes.delete('/eliminar', EstadoAlojController.eliminar);


module.exports = EstadoAlojamientoRoutes;