const express = require('express');
const TarifaRoutes = express.Router();

const TarifaController = require('../controllers/tarifa.controller');

TarifaRoutes.get('/', TarifaController.principal);
TarifaRoutes.get('/buscar', TarifaController.buscar);

TarifaRoutes.post('/nuevo', TarifaController.nuevo);
TarifaRoutes.put('/editar', TarifaController.editar);
TarifaRoutes.delete('/eliminar', TarifaController.eliminar);


module.exports = TarifaRoutes;