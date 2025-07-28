// controlador/nutricionControlador.js
const modelo = require('../modelo/nutriciondetalladaModelo');

module.exports = {
  listar: async (req, res) => {
    try {
      const recetas = await modelo.obtenerTodas();
      res.status(200).json(recetas);
    } catch (error) {
      console.error('Error al listar recetas:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  

  obtener: async (req, res) => {
    try {
      const receta = await modelo.obtenerPorId(req.params.id);
      if (!receta) {
        return res.status(404).json({ mensaje: 'Receta no encontrada' });
      }
      res.status(200).json(receta);
    } catch (error) {
      console.error('Error al obtener receta:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  crear: async (req, res) => {
    try {
      const datos = req.body;
      if (!datos.nombre || !datos.calorias || !datos.porcion) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }

      const nuevaId = await modelo.crear(datos);
      res.status(201).json({ id: nuevaId, mensaje: 'Receta creada con éxito' });
    } catch (error) {
      console.error('Error al crear receta:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  actualizar: async (req, res) => {
    try {
      const receta = await modelo.obtenerPorId(req.params.id);
      if (!receta) {
        return res.status(404).json({ mensaje: 'Receta no encontrada' });
      }

      await modelo.actualizar(req.params.id, req.body);
      res.status(200).json({ mensaje: 'Receta actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar receta:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  eliminar: async (req, res) => {
    try {
      const receta = await modelo.obtenerPorId(req.params.id);
      if (!receta) {
        return res.status(404).json({ mensaje: 'Receta no encontrada' });
      }

      await modelo.eliminar(req.params.id);
      res.status(200).json({ mensaje: 'Receta eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar receta:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  filtrar: async (req, res) => {
  try {
    const filtros = req.query;

    const recetas = await modelo.filtrar(filtros);
    if (recetas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron recetas con esos filtros' });
    }

    res.status(200).json(recetas);
  } catch (error) {
    console.error('Error al filtrar recetas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}
};
