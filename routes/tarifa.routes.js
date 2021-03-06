const express = require('express');
const TarifaRoutes = express.Router();

const TarifaController = require('../controllers/tarifa.controller');

TarifaRoutes.get('/', TarifaController.principal);
TarifaRoutes.get('/buscar/:key/:value', TarifaController.buscar);
TarifaRoutes.get('/buscar/:id', TarifaController.buscarId);
TarifaRoutes.post('/nuevo', TarifaController.nuevo);
TarifaRoutes.put('/editar/:id', TarifaController.editar);
TarifaRoutes.delete('/eliminar/:id', TarifaController.eliminar);


module.exports = TarifaRoutes;