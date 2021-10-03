const express = require('express');
const TipoAlojamientoRoutes = express.Router();

const TipoAlojController = require('../controllers/alojamiento_tipo.controller');

TipoAlojamientoRoutes.get('/', TipoAlojController.principal);
TipoAlojamientoRoutes.get('/buscar/:key/:value', TipoAlojController.buscar);
TipoAlojamientoRoutes.get('/buscar/:id', TipoAlojController.buscarId)
TipoAlojamientoRoutes.post('/nuevo', TipoAlojController.nuevo);
TipoAlojamientoRoutes.put('/editar/:id', TipoAlojController.editar);
TipoAlojamientoRoutes.delete('/eliminar/:id', TipoAlojController.eliminar);


module.exports = TipoAlojamientoRoutes;