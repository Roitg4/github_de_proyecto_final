const express = require('express');
const TipoAlojamientoRoutes = express.Router();

const TipoAlojController = require('../controllers/alojamiento_tipo.controller');

TipoAlojamientoRoutes.get('/', TipoAlojController.principal);
TipoAlojamientoRoutes.get('/buscar', TipoAlojController.buscar);

TipoAlojamientoRoutes.post('/nuevo', TipoAlojController.nuevo);
TipoAlojamientoRoutes.put('/editar', TipoAlojController.editar);
TipoAlojamientoRoutes.delete('/eliminar', TipoAlojController.eliminar);


module.exports = TipoAlojamientoRoutes;