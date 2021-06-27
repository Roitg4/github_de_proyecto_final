const express = require('express');
const auth = require('../middleware/auth');
const TarifaRoutes = express.Router();

const TarifaController = require('../controllers/tarifa.controller');

TarifaRoutes.get('/', auth, TarifaController.principal);
TarifaRoutes.get('/buscar/:key/:value', auth, TarifaController.buscar);

TarifaRoutes.post('/nuevo', auth, TarifaController.nuevo);
TarifaRoutes.put('/editar', auth, TarifaController.editar);
TarifaRoutes.delete('/eliminar', auth, TarifaController.eliminar);


module.exports = TarifaRoutes;