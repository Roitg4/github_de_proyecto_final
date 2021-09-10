const express = require('express');
const TarifaxTipoRoutes = express.Router();

const TarifaTipoController = require('../controllers/tarifa_x_tipo.controller');

TarifaxTipoRoutes.get('/', TarifaTipoController.principal);
TarifaxTipoRoutes.get('/buscar/:key/:value', TarifaTipoController.buscar);
TarifaxTipoRoutes.get('/buscar/:id', TarifaTipoController.buscarId);
TarifaxTipoRoutes.post('/nuevo', TarifaTipoController.nuevo);
TarifaxTipoRoutes.put('/editar', TarifaTipoController.editar);
TarifaxTipoRoutes.delete('/eliminar', TarifaTipoController.eliminar);


module.exports = TarifaxTipoRoutes;