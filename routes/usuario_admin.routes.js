const express = require('express');
const auth = require('../middleware/auth');
const UsuarioRoutes = express.Router();

const UsuarioAdmController = require('../controllers/usuario_admin.controller');

// de acceso privado
UsuarioRoutes.get('/', auth, UsuarioAdmController.principal );//Busca a todos
UsuarioRoutes.get('/buscar', auth, UsuarioAdmController.buscar );//Busca uno
UsuarioRoutes.put('/editar', auth, UsuarioAdmController.editar );//Editar info de usuario
UsuarioRoutes.delete('/eliminar', auth, UsuarioAdmController.eliminar );//Eliminar al usuario


//----------------------------------------------------------------
// de acceso publico
UsuarioRoutes.post('/registro',  UsuarioAdmController.registro );//Crear un usuario
UsuarioRoutes.post('/login',  UsuarioAdmController.login );//Logearse con un usuario



module.exports = UsuarioRoutes;