const express = require('express');
const auth = require('../middleware/auth');
const AdicionalRoutes = express.Router();

const AdicionalController = require('../controllers/adicional.controller');

AdicionalRoutes.get('/', auth, AdicionalController.principal);
AdicionalRoutes.get('/buscar/:key/:value', AdicionalController.buscar);

AdicionalRoutes.post('/nuevo', auth, AdicionalController.nuevo);
AdicionalRoutes.put('/editar', auth, AdicionalController.editar);
AdicionalRoutes.delete('/eliminar', auth, AdicionalController.eliminar);


module.exports = AdicionalRoutes;