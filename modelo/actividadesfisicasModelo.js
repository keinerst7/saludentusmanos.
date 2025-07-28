// modelo/actividadesfisicasModelo.js
const dbService = require('./bd/Conexion');

class ActividadFisicaModelo {
  static async getAll() {
    const [rows] = await dbService.query('SELECT * FROM actividadesfisicas');
    return rows;
  }

  static async getById(id) {
    const [rows] = await dbService.query('SELECT * FROM actividadesfisicas WHERE id = ?', [id]);
    return rows[0];
  }

 static async create({ idusuario, tipoactividad, duracionminutos, intensidad, caloriasquemadas }) {
  const query = 'INSERT INTO actividadesfisicas (idusuario, tipoactividad, duracionminutos, intensidad, caloriasquemadas) VALUES (?, ?, ?, ?, ?)';
  const values = [idusuario, tipoactividad, duracionminutos, intensidad, caloriasquemadas];
  const [result] = await dbService.query(query, values);
  return result; // result es un objeto ResultSetHeader, no iterable
}



  static async update(id, { idusuario, tipoactividad, duracionminutos, intensidad, caloriasquemadas }) {
    const query = 'UPDATE actividadesfisicas SET idusuario=?, tipoactividad=?, duracionminutos=?, intensidad=?, caloriasquemadas=? WHERE id=?';
    const values = [idusuario, tipoactividad, duracionminutos, intensidad, caloriasquemadas, id];
    const [result] = await dbService.query(query, values);
    return result;
  }

  static async patch(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    if (keys.length === 0) throw new Error('No hay campos para actualizar');
    const setClause = keys.map(key => `${key}=?`).join(', ');
    const [result] = await dbService.query(`UPDATE actividadesfisicas SET ${setClause} WHERE id=?`, [...values, id]);
    return result;
  }

  static async delete(id) {
    const [result] = await dbService.query('DELETE FROM actividadesfisicas WHERE id=?', [id]);
    return result;
  }
}

module.exports = ActividadFisicaModelo;
