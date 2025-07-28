// router/actividadesfisicas.js
const express = require('express');
const router = express.Router();
const ActividadFisicaControlador = require('../controlador/actividadesfisicasControlador');

// Obtener todas las actividades físicas
router.get('/', ActividadFisicaControlador.getAll);

// Obtener una actividad física por ID
router.get('/:id', ActividadFisicaControlador.getOnly);

// Crear una nueva actividad física
router.post('/', ActividadFisicaControlador.create);


// Actualizar toda la actividad física (PUT)
router.put('/:id', ActividadFisicaControlador.update);

// Modificar parcialmente la actividad física (PATCH)
router.patch('/:id', ActividadFisicaControlador.patch);

// Eliminar una actividad física por ID
router.delete('/:id', ActividadFisicaControlador.delete);

module.exports = router;
