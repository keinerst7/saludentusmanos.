// modelo/planescomidaModelo.js
const pool = require('./bd/Conexion');

module.exports = {
  // Obtener todos los planes
  obtenerTodos: async () => {
    const [rows] = await pool.query('SELECT * FROM planescomida');
    return rows;
  },

  // Obtener un plan por ID
  obtenerPorId: async (id) => {
    const [rows] = await pool.query('SELECT * FROM planescomida WHERE id = ?', [id]);
    return rows[0];
  },

  // Crear un nuevo plan
  crear: async (datos) => {
    const {
      idUsuario, nombre, objetivo,
      caloriasMeta, proteinasMeta, grasasMeta, carbohidratosMeta,
      fechaInicio, fechaFin
    } = datos;

    const [result] = await pool.query(
      `INSERT INTO planescomida
      (idUsuario, nombre, objetivo, caloriasMeta, proteinasMeta, grasasMeta, carbohidratosMeta, fechaInicio, fechaFin)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [idUsuario, nombre, objetivo, caloriasMeta, proteinasMeta, grasasMeta, carbohidratosMeta, fechaInicio, fechaFin]
    );

    return result.insertId;
  },

  // Actualizar un plan
  actualizar: async (id, datos) => {
    const {
      nombre, objetivo,
      caloriasMeta, proteinasMeta, grasasMeta, carbohidratosMeta,
      fechaInicio, fechaFin
    } = datos;

    await pool.query(
      `UPDATE planescomida SET
      nombre = ?, objetivo = ?, caloriasMeta = ?, proteinasMeta = ?, grasasMeta = ?, carbohidratosMeta = ?, fechaInicio = ?, fechaFin = ?
      WHERE id = ?`,
      [nombre, objetivo, caloriasMeta, proteinasMeta, grasasMeta, carbohidratosMeta, fechaInicio, fechaFin, id]
    );
  },

  // Eliminar un plan
  eliminar: async (id) => {
    await pool.query('DELETE FROM planescomida WHERE id = ?', [id]);
  }
};
