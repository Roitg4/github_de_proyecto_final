const express = require('express');
const AdicionalRoutes = express.Router();

const AdicionalController = require('../controllers/adicional.controller');

AdicionalRoutes.get('/', AdicionalController.principal);
AdicionalRoutes.get('/buscar/:key/:value', AdicionalController.buscar);
AdicionalRoutes.get('/buscar/:id', AdicionalController.buscarId);
AdicionalRoutes.post('/nuevo', AdicionalController.nuevo);
AdicionalRoutes.put('/editar', AdicionalController.editar);
AdicionalRoutes.delete('/eliminar', AdicionalController.eliminar);


module.exports = AdicionalRoutes;