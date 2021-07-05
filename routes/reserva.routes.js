const express = require('express');
const auth = require('../middleware/auth');
const ReservaRoutes = express.Router();

const ReservaController = require('../controllers/reserva.controller');

ReservaRoutes.get('/', auth, ReservaController.principal);
ReservaRoutes.get('/buscar/:key/:value', auth, ReservaController.buscar);

ReservaRoutes.post('/nuevo', auth, ReservaController.nuevo);
ReservaRoutes.put('/editar', auth, ReservaController.editar);
ReservaRoutes.delete('/eliminar', auth, ReservaController.eliminar);


module.exports = ReservaRoutes;