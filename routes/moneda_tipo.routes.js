const express = require('express');
const TipoMonedaRoutes = express.Router();

const TipoMonedaController = require('../controllers/moneda_tipo.controller');

TipoMonedaRoutes.get('/', TipoMonedaController.principal);
TipoMonedaRoutes.get('/buscar/:key/:value', TipoMonedaController.buscar);

TipoMonedaRoutes.post('/nuevo', TipoMonedaController.nuevo);
TipoMonedaRoutes.put('/editar', TipoMonedaController.editar);
TipoMonedaRoutes.delete('/eliminar', TipoMonedaController.eliminar);


module.exports = TipoMonedaRoutes;