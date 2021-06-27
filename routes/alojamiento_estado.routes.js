const express = require('express');
const auth = require('../middleware/auth');
const EstadoAlojamientoRoutes = express.Router();

const EstadoAlojController = require('../controllers/alojamiento_estado.controller');

EstadoAlojamientoRoutes.get('/', auth, EstadoAlojController.principal);
EstadoAlojamientoRoutes.get('/buscar/:key/:value', auth, EstadoAlojController.buscar);

EstadoAlojamientoRoutes.post('/nuevo', auth, EstadoAlojController.nuevo);
EstadoAlojamientoRoutes.put('/editar', auth, EstadoAlojController.editar);
EstadoAlojamientoRoutes.delete('/eliminar', auth, EstadoAlojController.eliminar);


module.exports = EstadoAlojamientoRoutes;