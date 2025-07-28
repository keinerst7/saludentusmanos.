const modelo = require('../modelo/metasdiariasModelo');

module.exports = {
  crearMeta: async (req, res) => {
    try {
      const { idUsuario, nombre, descripcion, tipo, valor, unidad, fecha } = req.body;

      if (!idUsuario || !nombre || !descripcion || !tipo || !valor || !fecha) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }

      console.log('🔍 Datos recibidos para crear meta:', { idUsuario, nombre, descripcion, tipo, valor, unidad, fecha });

      const resultado = await modelo.crear({ idUsuario, nombre, descripcion, tipo, valor, unidad, fecha });
      res.status(201).json({ mensaje: '✅ Meta creada correctamente', id: resultado.insertId });

    } catch (error) {
      console.error('❌ Error al crear meta:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  listarMetas: async (req, res) => {
    try {
      const metas = await modelo.obtenerPorUsuario(req.params.idUsuario);
      res.status(200).json(metas);
    } catch (error) {
      console.error('❌ Error al obtener metas:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  actualizarMeta: async (req, res) => {
    try {
      await modelo.actualizar(req.params.id, req.body);
      res.status(200).json({ mensaje: '✅ Meta actualizada correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar meta:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  eliminarMeta: async (req, res) => {
    try {
      await modelo.eliminar(req.params.id);
      res.status(200).json({ mensaje: '✅ Meta eliminada correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar meta:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
};