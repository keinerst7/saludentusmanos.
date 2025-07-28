// rutas/nutricionRuta.js
const express = require('express');
const router = express.Router();
const controlador = require('../controlador/nutriciondetalladaControlador');

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.get('/filtro/avanzado', controlador.filtrar);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.delete('/:id', controlador.eliminar);
router.get('/filtro', controlador.filtrar);




module.exports = router;
