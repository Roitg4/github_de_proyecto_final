const express = require('express');
const EstadoAlojamientoRoutes = express.Router();

const EstadoAlojController = require('../controllers/alojamiento_estado.controller');

EstadoAlojamientoRoutes.get('/', EstadoAlojController.principal);
EstadoAlojamientoRoutes.get('/buscar/:key/:value', EstadoAlojController.buscar);
EstadoAlojamientoRoutes.get('/buscar/:id', EstadoAlojController.buscarId)
EstadoAlojamientoRoutes.post('/nuevo', EstadoAlojController.nuevo);
EstadoAlojamientoRoutes.put('/editar/:id', EstadoAlojController.editar);
EstadoAlojamientoRoutes.delete('/eliminar/:id', EstadoAlojController.eliminar);


module.exports = EstadoAlojamientoRoutes;