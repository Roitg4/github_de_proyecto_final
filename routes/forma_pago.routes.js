const express = require('express');
const auth = require('../middleware/auth');
const FormaRoutes = express.Router();

const FormaPagoController = require('../controllers/forma_pago.controller');

FormaRoutes.get('/', auth, FormaPagoController.principal);
FormaRoutes.get('/buscar/:key/:value', auth, FormaPagoController.buscar);

FormaRoutes.post('/nuevo', auth, FormaPagoController.nuevo);
FormaRoutes.put('/editar', auth, FormaPagoController.editar);
FormaRoutes.delete('/eliminar', auth, FormaPagoController.eliminar);


module.exports = FormaRoutes;