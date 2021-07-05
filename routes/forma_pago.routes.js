const express = require('express');
const FormaRoutes = express.Router();

const FormaPagoController = require('../controllers/forma_pago.controller');

FormaRoutes.get('/', FormaPagoController.principal);
FormaRoutes.get('/buscar/:key/:value', FormaPagoController.buscar);

FormaRoutes.post('/nuevo', FormaPagoController.nuevo);
FormaRoutes.put('/editar', FormaPagoController.editar);
FormaRoutes.delete('/eliminar', FormaPagoController.eliminar);


module.exports = FormaRoutes;