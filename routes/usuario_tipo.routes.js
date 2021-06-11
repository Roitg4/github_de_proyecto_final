const TipoRoutes = require('express').Router();

const TipoController = require('../controllers/usuario_tipo.controllers');

TipoRoutes.get('/', TipoController.principal);
TipoRoutes.get('/buscar/:key/:value', TipoController.buscar);
TipoRoutes.post('/nuevo', TipoController.nuevo);
TipoRoutes.put('/editar', TipoController.editar);
TipoRoutes.delete('/eliminar', TipoController.eliminar);

module.exports = TipoRoutes;