// controlador/alimentosControlador.js
const modelo = require('../modelo/alimentosModelo');

module.exports = {
  registrar: async (req, res) => {
    try {
      const datos = req.body;
      if (!datos.idUsuario || !datos.nombre || !datos.fecha) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }
      await modelo.registrar(datos);
      res.status(201).json({ mensaje: '✅ Alimento registrado correctamente' });
    } catch (error) {
      console.error('❌ Error al registrar alimento:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  listar: async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const alimentos = await modelo.listarPorUsuario(idUsuario);
      res.status(200).json(alimentos);
    } catch (error) {
      console.error('❌ Error al listar alimentos:', error.sqlMessage || error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
};