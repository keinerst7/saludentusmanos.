const modelo = require('../modelo/logrosnotificacionesModelo');

const controlador = {
  getAll: async (req, res) => {
    try {
      const [filas] = await modelo.obtenerTodos();
      res.json(filas);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
  },

  getByUsuario: async (req, res) => {
    try {
      const [filas] = await modelo.obtenerPorUsuario(req.params.idUsuario);
      res.json(filas);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener notificaciones del usuario' });
    }
  },

  create: async (req, res) => {
    try {
      const datos = req.body;
      await modelo.crear(datos);
      res.send('Notificación registrada');
    } catch (err) {
      res.status(500).json({ error: 'Error al registrar la notificación' });
    }
  },

  

  update: async (req, res) => {
    try {
      const datos = req.body;
      await modelo.actualizar(req.params.id, datos);
      res.send('Notificación actualizada');
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar la notificación' });
    }
  },


   patch: async (req, res) => {
    try {
      const campos = req.body;
      await modelo.actualizarParcial(req.params.id, campos);
      res.send('Notificación actualizada parcialmente');
    } catch (err) {
      res.status(500).json({ error: 'Error al hacer actualización parcial de la notificación' });
    }
  },
  

  delete: async (req, res) => {
    try {
      await modelo.eliminar(req.params.id);
      res.send('Notificación eliminada');
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar la notificación' });
    }
  }
};

module.exports = controlador;