const express = require('express');
const ReservaxAdicionalRoutes = express.Router();

const ReservaAdicionalController = require('../controllers/reserva_x_adicional.controller');

ReservaxAdicionalRoutes.get('/', ReservaAdicionalController.principal);
ReservaxAdicionalRoutes.get('/buscar/:key/:value', ReservaAdicionalController.buscar);
ReservaxAdicionalRoutes.get('/buscar/:id', ReservaAdicionalController.buscarId);
ReservaxAdicionalRoutes.post('/nuevo', ReservaAdicionalController.nuevo);
ReservaxAdicionalRoutes.put('/editar/:id', ReservaAdicionalController.editar);
ReservaxAdicionalRoutes.delete('/eliminar/:id', ReservaAdicionalController.eliminar);


module.exports = ReservaxAdicionalRoutes;