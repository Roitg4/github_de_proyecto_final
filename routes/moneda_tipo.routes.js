const express = require('express');
const auth = require('../middleware/auth');
const TipoMonedaRoutes = express.Router();

const TipoMonedaController = require('../controllers/moneda_tipo.controller');

TipoMonedaRoutes.get('/', auth, TipoMonedaController.principal);
TipoMonedaRoutes.get('/buscar/:key/:value', auth, TipoMonedaController.buscar);

TipoMonedaRoutes.post('/nuevo', auth, TipoMonedaController.nuevo);
TipoMonedaRoutes.put('/editar', auth, TipoMonedaController.editar);
TipoMonedaRoutes.delete('/eliminar', auth, TipoMonedaController.eliminar);


module.exports = TipoMonedaRoutes;