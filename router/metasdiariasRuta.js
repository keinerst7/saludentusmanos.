const express = require('express');
const router = express.Router();
const controlador = require('../controlador/metasdiariasControlador');

router.post('/', controlador.crearMeta);
router.get('/:idUsuario', controlador.listarMetas);
router.put('/:id', controlador.actualizarMeta);
router.delete('/:id', controlador.eliminarMeta);

module.exports = router;