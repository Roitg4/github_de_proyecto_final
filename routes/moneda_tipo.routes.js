const express = require('express');
const TipoMonedaRoutes = express.Router();

const TipoMonedaController = require('../controllers/moneda_tipo.controller');

TipoMonedaRoutes.get('/', TipoMonedaController.principal);
TipoMonedaRoutes.get('/buscar/:key/:value', TipoMonedaController.buscar);
TipoMonedaRoutes.get('/buscar/:id', TipoMonedaController.buscarId);
TipoMonedaRoutes.post('/nuevo', TipoMonedaController.nuevo);
TipoMonedaRoutes.put('/editar/:id', TipoMonedaController.editar);
TipoMonedaRoutes.delete('/eliminar/:id', TipoMonedaController.eliminar);


module.exports = TipoMonedaRoutes;