// router/UsuariosRutas.js
const express = require('express');
const router = express.Router();
const UsuarioControlador = require('../controlador/UsuarioControlador');

// Obtener todos los usuarios
router.get('/', UsuarioControlador.todoUsuario);
router.get('/usuarios', UsuarioControlador.todoUsuario);
router.get('/usuarioI/:id', UsuarioControlador.buscarPorId);
router.get('/usuarioDOC/:doc', UsuarioControlador.buscarPorDoc);
router.get('/usuarioNOM/:nom', UsuarioControlador.buscarPorNombres);
router.get('/usuarioTEL/:tel', UsuarioControlador.buscarPorTelefono);
router.get('/usuarioEma/:ema', UsuarioControlador.buscarPorCorreo);
router.get('/usuarioRol/:r', UsuarioControlador.buscarPorRol);
router.post('/usuarios', UsuarioControlador.crearUsuario);
router.put('/usuarios', UsuarioControlador.editarUsuario);
router.delete('/usuarios/:id', UsuarioControlador.borrarUsuario);

module.exports = router; 