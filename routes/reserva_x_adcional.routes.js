const express = require('express');
const auth = require('../middleware/auth');
const ReservaxAdicionalRoutes = express.Router();

const ReservaAdicionalController = require('../controllers/reserva_x_adicional.controller');

ReservaxAdicionalRoutes.get('/', auth, ReservaAdicionalController.principal);
ReservaxAdicionalRoutes.get('/buscar/:key/:value', auth, ReservaAdicionalController.buscar);

ReservaxAdicionalRoutes.post('/nuevo', auth, ReservaAdicionalController.nuevo);
ReservaxAdicionalRoutes.put('/editar', auth, ReservaAdicionalController.editar);
ReservaxAdicionalRoutes.delete('/eliminar', auth, ReservaAdicionalController.eliminar);


module.exports = ReservaxAdicionalRoutes;