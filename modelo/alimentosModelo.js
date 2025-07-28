// modelo/alimentosModelo.js
const pool = require('./bd/Conexion');

module.exports = {
  registrar: async (datos) => {
    const [resultado] = await pool.query(
      `INSERT INTO alimentos 
      (idUsuario, nombre, calorias, proteinas, grasas, carbohidratos, fecha) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        datos.idUsuario,
        datos.nombre,
        datos.calorias,
        datos.proteinas,
        datos.grasas,
        datos.carbohidratos,
        datos.fecha
      ]
    );
    return resultado;
  },

  listarPorUsuario: async (idUsuario) => {
    const [filas] = await pool.query(
      `SELECT * FROM alimentos WHERE idUsuario = ? ORDER BY fecha DESC`,
      [idUsuario]
    );
    return filas;
  }
};