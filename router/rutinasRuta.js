const express = require('express');
const router = express.Router();
const controlador = require('../controlador/rutinasControlador');

router.post('/', controlador.crearRutina);
router.get('/:idUsuario', controlador.listarRutinas);
router.put('/:id', controlador.actualizarRutina);
router.delete('/:id', controlador.eliminarRutina);

module.exports = router;