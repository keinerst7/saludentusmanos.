// modelo/nutricionModelo.js
const pool = require('./bd/Conexion');

// CRUD para recetas con información nutricional
module.exports = {
  // Obtener todas las recetas
  obtenerTodas: async () => {
    const [rows] = await pool.query('SELECT * FROM recetas');
    return rows;
  },



  // Obtener una receta por ID
  obtenerPorId: async (id) => {
    const [rows] = await pool.query('SELECT * FROM recetas WHERE id = ?', [id]);
    return rows[0];
  },

  // Crear una nueva receta
  crear: async (datos) => {
    const { nombre, descripcion, calorias, proteinas, carbohidratos, grasas, porcion } = datos;
    const [result] = await pool.query(
      'INSERT INTO recetas (nombre, descripcion, calorias, proteinas, carbohidratos, grasas, porcion) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, calorias, proteinas, carbohidratos, grasas, porcion]
    );
    return result.insertId;
  },

  // Actualizar una receta
  actualizar: async (id, datos) => {
    const { nombre, descripcion, calorias, proteinas, carbohidratos, grasas, porcion } = datos;
    await pool.query(
      'UPDATE recetas SET nombre = ?, descripcion = ?, calorias = ?, proteinas = ?, carbohidratos = ?, grasas = ?, porcion = ? WHERE id = ?',
      [nombre, descripcion, calorias, proteinas, carbohidratos, grasas, porcion, id]
    );
  },

  // Eliminar una receta
  eliminar: async (id) => {
    await pool.query('DELETE FROM recetas WHERE id = ?', [id]);
  },

  filtrar: async (filtros) => {
  let sql = 'SELECT * FROM recetas WHERE 1=1';
  const valores = [];

  if (filtros.caloriasMax) {
    sql += ' AND calorias <= ?';
    valores.push(filtros.caloriasMax);
  }

  if (filtros.proteinasMin) {
    sql += ' AND proteinas >= ?';
    valores.push(filtros.proteinasMin);
  }

  if (filtros.carbohidratosMax) {
    sql += ' AND carbohidratos <= ?';
    valores.push(filtros.carbohidratosMax);
  }

  if (filtros.grasasMax) {
    sql += ' AND grasas <= ?';
    valores.push(filtros.grasasMax);
  }

  const [rows] = await pool.query(sql, valores);
  return rows;
}
};
