const TipoRoutes = require('express').Router();
const TipoController = require('../controllers/tipo_usuario.controllers');


TipoRoutes.get('/', TipoController.principal);
TipoRoutes.get('/buscar/:key/:value', TipoController.buscar);
TipoRoutes.get('/buscar/:id', TipoController.buscarId)
TipoRoutes.post('/nuevo', TipoController.nuevo);
TipoRoutes.put('/editar/:id', TipoController.editar);
TipoRoutes.delete('/eliminar/:id', TipoController.eliminar);

module.exports = TipoRoutes;