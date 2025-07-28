const pool = require('./bd/Conexion');

const progresosaludModelo = {
  obtenerTodos: () => {
    return pool.query('SELECT * FROM progresosalud');
  },

  obtenerPorUsuario: (idUsuario) => {
    return pool.query('SELECT * FROM progresosalud WHERE idUsuario = ? ORDER BY fecha', [idUsuario]);
  },

  crear: (registro) => {
    return pool.query('INSERT INTO progresosalud SET ?', [registro]);
  },

  actualizar: (id, datos) => {
    return pool.query('UPDATE progresosalud SET ? WHERE id = ?', [datos, id]);
  },

  

  eliminar: (id) => {
    return pool.query('DELETE FROM progresosalud WHERE id = ?', [id]);
  }
};

module.exports = progresosaludModelo;
