// router/alimentosRuta.js
const express = require('express');
const router = express.Router();
const controlador = require('../controlador/alimentosControlador');

router.post('/registrar', controlador.registrar);
router.get('/listar/:idUsuario', controlador.listar);

module.exports = router;