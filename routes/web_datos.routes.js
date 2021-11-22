const express = require('express');
const AlojamientoRoutes = express.Router();

const AlojamientoController = require('../controllers/web_datos.controller');

AlojamientoRoutes.get('/lista-alojamiento', AlojamientoController.listaAlojamiento);
AlojamientoRoutes.get('/lista-tipo-alojamiento', AlojamientoController.listaTipoAlojamiento);
AlojamientoRoutes.get('/alojamiento-detalle/:id', AlojamientoController.alojamientoDetalle);



module.exports = AlojamientoRoutes;