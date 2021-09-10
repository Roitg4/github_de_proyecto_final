const express = require('express');
/* const auth = require('../middleware/auth'); */
const UsuarioRoutes = express.Router();

const UsuarioAdmController = require('../controllers/usuario_admin.controller');

// de acceso privado
UsuarioRoutes.get('/', UsuarioAdmController.principal );//Busca a todos
UsuarioRoutes.get('/buscar/:key/:value', UsuarioAdmController.buscar );//Busca uno
UsuarioRoutes.get('/buscar/:id', UsuarioAdmController.buscarId );
UsuarioRoutes.put('/editar', UsuarioAdmController.editar );//Editar info de usuario
UsuarioRoutes.delete('/eliminar', UsuarioAdmController.eliminar );//Eliminar al usuario


//----------------------------------------------------------------
// de acceso publico
UsuarioRoutes.post('/registro',  UsuarioAdmController.registro );//Crear un usuario
UsuarioRoutes.post('/login',  UsuarioAdmController.login );//Logearse con un usuario
UsuarioRoutes.post('/verifyToken',  UsuarioAdmController.verifyToken );



module.exports = UsuarioRoutes;