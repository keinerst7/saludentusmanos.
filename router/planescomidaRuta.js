// router/planescomidaRuta.js
const express = require('express');
const router = express.Router();
const controlador = require('../controlador/planescomidaControlador');

router.get('/', controlador.listar);                // GET todos los planes
router.get('/:id', controlador.obtener);            // GET un plan por ID
router.post('/', controlador.crear);                // POST crear nuevo plan
router.put('/:id', controlador.actualizar);         // PUT actualizar un plan
router.delete('/:id', controlador.eliminar);        // DELETE eliminar un plan

module.exports = router;