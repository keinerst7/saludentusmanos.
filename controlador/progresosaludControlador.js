const modelo = require('../modelo/progresosaludModelo');

const controlador = {
  getAll: async (req, res) => {
    const [filas] = await modelo.obtenerTodos();
    res.json(filas);
  },

  getByUsuario: async (req, res) => {
    const [filas] = await modelo.obtenerPorUsuario(req.params.idUsuario);
    res.json(filas);
  },

  create: async (req, res) => {
    const datos = req.body;
    await modelo.crear(datos);
    res.send('Progreso registrado');
  },

  update: async (req, res) => {
    const datos = req.body;
    await modelo.actualizar(req.params.id, datos);
    res.send('Progreso actualizado');
  },

  delete: async (req, res) => {
    await modelo.eliminar(req.params.id);
    res.send('Progreso eliminado');
  }
};

module.exports = controlador;
