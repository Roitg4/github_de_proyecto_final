const TipoRoutes = require('express').Router();
const auth = require('../middleware/auth');
const TipoController = require('../controllers/usuario_tipo.controllers');

TipoRoutes.get('/', auth, TipoController.principal);
TipoRoutes.get('/buscar/:key/:value', auth, TipoController.buscar);
TipoRoutes.post('/nuevo', auth, TipoController.nuevo);
TipoRoutes.put('/editar', auth, TipoController.editar);
TipoRoutes.delete('/eliminar', auth, TipoController.eliminar);

module.exports = TipoRoutes;