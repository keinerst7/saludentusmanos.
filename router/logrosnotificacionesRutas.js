const express = require('express');
const router = express.Router();
const controlador = require('../controlador/logrosnotificacionesControlador');

router.get('/', controlador.getAll);
router.get('/:idUsuario', controlador.getByUsuario);
router.post('/', controlador.create);
router.put('/:id', controlador.update);
router.patch('/:id', controlador.patch);
router.delete('/:id', controlador.delete);

module.exports = router;