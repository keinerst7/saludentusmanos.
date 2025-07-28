const pool = require('./bd/Conexion');

module.exports = {
  crear: async ({ idUsuario, nombre, descripcion, tipo, valor, unidad, fecha }) => {
    const [resultado] = await pool.query(
      'INSERT INTO metasdiarias (idUsuario, nombre, descripcion, tipo, valor, unidad, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [idUsuario, nombre, descripcion, tipo, valor, unidad, fecha]
    );
    return resultado;
  },

  obtenerPorUsuario: async (idUsuario) => {
    const [rows] = await pool.query(
      'SELECT * FROM metasdiarias WHERE idUsuario = ?',
      [idUsuario]
    );
    return rows;
  },

  actualizar: async (id, datos) => {
    const { nombre, descripcion, tipo, valor, unidad, fecha } = datos;
    const [resultado] = await pool.query(
      `UPDATE metasdiarias 
       SET nombre = ?, descripcion = ?, tipo = ?, valor = ?, unidad = ?, fecha = ?
       WHERE id = ?`,
      [nombre, descripcion, tipo, valor, unidad, fecha, id]
    );
    return resultado;
  },

  eliminar: async (id) => {
    const [resultado] = await pool.query(
      'DELETE FROM metasdiarias WHERE id = ?',
      [id]
    );
    return resultado;
  }
};