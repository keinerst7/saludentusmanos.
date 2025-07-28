const pool = require('./bd/Conexion');

module.exports = {
  crear: async ({ idUsuario, tipo = null, actividad, descripcion = '', hora, fecha }) => {
    const [res] = await pool.query(
      `INSERT INTO rutinas (idUsuario, tipo, actividad, descripcion, hora, fecha)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [idUsuario, tipo, actividad, descripcion, hora, fecha]
    );
    return res;
  },

  obtenerPorUsuario: async (idUsuario) => {
    const [rows] = await pool.query(
      `SELECT * FROM rutinas WHERE idUsuario = ?`,
      [idUsuario]
    );
    return rows;
  },

  actualizar: async (id, datos) => {
    const { tipo = null, actividad, descripcion = '', hora, fecha } = datos;
    const [res] = await pool.query(
      `UPDATE rutinas SET tipo = ?, actividad = ?, descripcion = ?, hora = ?, fecha = ? WHERE id = ?`,
      [tipo, actividad, descripcion, hora, fecha, id]
    );
    return res;
  },

  eliminar: async (id) => {
    const [res] = await pool.query(
      `DELETE FROM rutinas WHERE id = ?`,
      [id]
    );
    return res;
  }
};