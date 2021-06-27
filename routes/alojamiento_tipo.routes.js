const express = require('express');
const auth = require('../middleware/auth');
const TipoAlojamientoRoutes = express.Router();

const TipoAlojController = require('../controllers/alojamiento_tipo.controller');

TipoAlojamientoRoutes.get('/', auth, TipoAlojController.principal);
TipoAlojamientoRoutes.get('/buscar/:key/:value', auth, TipoAlojController.buscar);

TipoAlojamientoRoutes.post('/nuevo', auth, TipoAlojController.nuevo);
TipoAlojamientoRoutes.put('/editar', auth, TipoAlojController.editar);
TipoAlojamientoRoutes.delete('/eliminar', auth, TipoAlojController.eliminar);


module.exports = TipoAlojamientoRoutes;