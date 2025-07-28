// controlador/recetacategoriaControlador.js
const modelo = require('../modelo/recetacategoriaModelo');

module.exports = {
  asignar: async (req, res) => {
    try {
      const { idReceta, idCategoria } = req.body;
      if (!idReceta || !idCategoria) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }

      await modelo.asignarCategoria(idReceta, idCategoria);
      res.status(201).json({ mensaje: 'Categoría asignada correctamente' });
    } catch (error) {
      console.error('❌ Error al asignar categoría:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  validar: async (req, res) => {
    try {
      const { idReceta, idCategoria } = req.params;
      const existe = await modelo.validarCategoria(idReceta, idCategoria);
      if (existe) {
        return res.status(200).json({ mensaje: '✅ La receta tiene esta categoría' });
      }
      res.status(404).json({ mensaje: '❌ La receta no tiene esta categoría' });
    } catch (error) {
      console.error('❌ Error al validar categoría:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
      console.log('Validando receta:', idReceta, 'con categoría:', idCategoria);

    }
  },

  listarPorCategoria: async (req, res) => {
    try {
      const { idCategoria } = req.params;
      const recetas = await modelo.obtenerPorCategoria(idCategoria);
      if (recetas.length === 0) {
        return res.status(404).json({ mensaje: 'No hay recetas en esta categoría' });
      }
      res.status(200).json(recetas);
    } catch (error) {
      console.error('❌ Error al listar recetas por categoría:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
};