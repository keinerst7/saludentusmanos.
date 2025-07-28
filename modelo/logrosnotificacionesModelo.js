const pool = require('./bd/Conexion');

const logrosModelo = {
  obtenerTodos: () => {
    return pool.query('SELECT * FROM logrosnotificaciones');
  },

  obtenerPorUsuario: (idUsuario) => {
    return pool.query('SELECT * FROM logrosnotificaciones WHERE idUsuario = ? ORDER BY fecha DESC', [idUsuario]);
  },

  crear: (datos) => {
    return pool.query('INSERT INTO logrosnotificaciones SET ?', [datos]);
  },
  

  actualizar: (id, datos) => {
    return pool.query('UPDATE logrosnotificaciones SET ? WHERE id = ?', [datos, id]);
  },



  actualizarParcial: (id, campos) => {
  return pool.query('UPDATE logrosnotificaciones SET ? WHERE id = ?', [campos, id]);
},


  eliminar: (id) => {
    return pool.query('DELETE FROM logrosnotificaciones WHERE id = ?', [id]);
  }
};

module.exports = logrosModelo;