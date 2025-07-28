// controlador/planescomidaControlador.js
const modelo = require('../modelo/planescomidaModelo');

module.exports = {
  listar: async (req, res) => {
    try {
      const planes = await modelo.obtenerTodos();
      res.status(200).json(planes);
    } catch (error) {
      console.error('❌ Error al listar planes:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  obtener: async (req, res) => {
    try {
      const plan = await modelo.obtenerPorId(req.params.id);
      if (!plan) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
      }
      res.status(200).json(plan);
    } catch (error) {
      console.error('❌ Error al obtener plan:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  crear: async (req, res) => {
    try {
      const datos = req.body;
      if (!datos.idUsuario || !datos.nombre || !datos.fechaInicio || !datos.fechaFin) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }
      const nuevoId = await modelo.crear(datos);
      res.status(201).json({ id: nuevoId, mensaje: 'Plan creado con éxito' });
    } catch (error) {
      console.error('❌ Error al crear plan:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  actualizar: async (req, res) => {
    try {
      const existente = await modelo.obtenerPorId(req.params.id);
      if (!existente) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
      }
      await modelo.actualizar(req.params.id, req.body);
      res.status(200).json({ mensaje: 'Plan actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar plan:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  eliminar: async (req, res) => {
    try {
      const plan = await modelo.obtenerPorId(req.params.id);
      if (!plan) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
      }
      await modelo.eliminar(req.params.id);
      res.status(200).json({ mensaje: 'Plan eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar plan:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
};