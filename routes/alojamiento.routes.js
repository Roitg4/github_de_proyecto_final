const express = require('express');
const AlojamientoRoutes = express.Router();

const AlojamientoController = require('../controllers/alojamiento.controller');

AlojamientoRoutes.get('/', AlojamientoController.principal);
AlojamientoRoutes.get('/buscar/:key/:value', AlojamientoController.buscar);
AlojamientoRoutes.get('/buscar/:id', AlojamientoController.buscarId);
AlojamientoRoutes.post('/nuevo', AlojamientoController.nuevo);
AlojamientoRoutes.put('/editar', AlojamientoController.editar);
AlojamientoRoutes.delete('/eliminar', AlojamientoController.eliminar);


module.exports = AlojamientoRoutes;