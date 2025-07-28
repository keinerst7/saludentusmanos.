// router/recetacategoriaRuta.js
const express = require('express');
const router = express.Router();
const controlador = require('../controlador/recetacategoriaControlador');

// POST: asignar una categoría a receta
router.post('/asignar', controlador.asignar);

// GET: validar si la receta tiene la categoría
router.get('/validar/:idReceta/:idCategoria', controlador.validar);

// GET: listar recetas por categoría
router.get('/porcategoria/:idCategoria', controlador.listarPorCategoria);

module.exports = router;