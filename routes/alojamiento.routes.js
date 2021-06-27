const express = require('express');
const auth = require('../middleware/auth');
const AlojamientoRoutes = express.Router();

const AlojamientoController = require('../controllers/alojamiento.controller');

AlojamientoRoutes.get('/', auth, AlojamientoController.principal);
AlojamientoRoutes.get('/buscar/:key/:value', auth, AlojamientoController.buscar);

AlojamientoRoutes.post('/nuevo', auth, AlojamientoController.nuevo);
AlojamientoRoutes.put('/editar', auth, AlojamientoController.editar);
AlojamientoRoutes.delete('/eliminar', auth, AlojamientoController.eliminar);


module.exports = AlojamientoRoutes;