// modelo/recetacategoriaModelo.js
const pool = require('./bd/Conexion');

module.exports = {
  // Asignar categoría a una receta
  asignarCategoria: async (idReceta, idCategoria) => {
    const [resultado] = await pool.query(
      'INSERT INTO recetacategoria (idReceta, idCategoria) VALUES (?, ?)',
      [idReceta, idCategoria]
    );
    return resultado;
  },

  // Validar si una receta tiene X categoría
  validarCategoria: async (idReceta, idCategoria) => {
    const [rows] = await pool.query(
      'SELECT * FROM recetacategoria WHERE idReceta = ? AND idCategoria = ?',
      [idReceta, idCategoria]
    );
    return rows.length > 0;
  },

  // Listar recetas por ID de categoría
  obtenerPorCategoria: async (idCategoria) => {
    const [rows] = await pool.query(
      `SELECT r.* FROM recetas r
       INNER JOIN recetacategoria rc ON r.idReceta = rc.idReceta
       WHERE rc.idCategoria = ?`,
      [idCategoria]
    );
    return rows;
  }
};
