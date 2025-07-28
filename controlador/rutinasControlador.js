const modelo = require('../modelo/rutinasModelo');

module.exports = {
  crearRutina: async (req, res) => {
    try {
      const { idUsuario, tipo, actividad, descripcion, hora, fecha } = req.body;

      if (!idUsuario || !actividad || !hora || !fecha) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }

      const resultado = await modelo.crear({
        idUsuario,
        tipo: tipo || null,
        actividad,
        descripcion: descripcion || '',
        hora,
        fecha
      });

      res.status(201).json({ mensaje: '✅ Rutina creada correctamente', id: resultado.insertId });
    } catch (error) {
      console.error('❌ Error al crear rutina:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  listarRutinas: async (req, res) => {
    try {
      const rutinas = await modelo.obtenerPorUsuario(req.params.idUsuario);
      res.status(200).json(rutinas);
    } catch (error) {
      console.error('❌ Error al obtener rutinas:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  actualizarRutina: async (req, res) => {
    try {
      await modelo.actualizar(req.params.id, req.body);
      res.status(200).json({ mensaje: '✅ Rutina actualizada correctamente' });
    } catch (error) {
      console.error('❌ Error al actualizar rutina:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  eliminarRutina: async (req, res) => {
    try {
      await modelo.eliminar(req.params.id);
      res.status(200).json({ mensaje: '✅ Rutina eliminada correctamente' });
    } catch (error) {
      console.error('❌ Error al eliminar rutina:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
};