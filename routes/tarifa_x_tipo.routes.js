const express = require('express');
const auth = require('../middleware/auth');
const TarifaxTipoRoutes = express.Router();

const TarifaTipoController = require('../controllers/tarifa_x_tipo.controller');

TarifaxTipoRoutes.get('/', auth, TarifaTipoController.principal);
TarifaxTipoRoutes.get('/buscar/:key/:value', auth, TarifaTipoController.buscar);

TarifaxTipoRoutes.post('/nuevo', auth, TarifaTipoController.nuevo);
TarifaxTipoRoutes.put('/editar', auth, TarifaTipoController.editar);
TarifaxTipoRoutes.delete('/eliminar', auth, TarifaTipoController.eliminar);


module.exports = TarifaxTipoRoutes;