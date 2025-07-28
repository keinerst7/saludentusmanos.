const dbService = require('./bd/Conexion');
const bcrypt = require('bcrypt');

class UsuarioModelo {
  // Obtener todos los usuarios con paginación
  static async todoUsuario(pagina = 1) {
    const limite = 50;  // Número máximo de productos por página
    const offset = (pagina - 1) * limite;  // Calculamos el offset para la paginación
    const query = `SELECT * FROM usuarios ORDER BY idUsuario ASC LIMIT ${limite} OFFSET ${offset}`;

    try {
      return await dbService.query(query);
    } catch (err) {
      throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
  }

  // Buscar usuario por ID
  static async buscarPorId(id) {
    const query = 'SELECT * FROM usuarios WHERE idUsuario = ?';
    try {
      const [user] = await dbService.query(query, [id]);
      return user || null;  // Devuelve null si no hay usuario
    } catch (err) {
      throw new Error(`Error al buscar el usuario por ID: ${err.message}`);
    }
  }

  // Buscar usuario por documento (autocompletado)
  static async buscarPorDoc(doc) {
    const query = 'SELECT * FROM usuarios WHERE documento LIKE ?';
    try {
      return await dbService.query(query, [`%${doc}%`]);
    } catch (err) {
      throw new Error(`Error al buscar el usuario por documento: ${err.message}`);
    }
  }

  // Buscar usuario por nombres (autocompletado)
  static async buscarPorNombres(name) {
    const query = 'SELECT * FROM usuarios WHERE nombres LIKE ?';
    try {
      return await dbService.query(query, [`%${name}%`]);
    } catch (err) {
      throw new Error(`Error al buscar el usuario por nombres: ${err.message}`);
    }
  }

  // Buscar usuario por teléfono (autocompletado)
  static async buscarPorTelefono(tel) {
    const query = 'SELECT * FROM usuarios WHERE telefono LIKE ?';
    try {
      return await dbService.query(query, [`%${tel}%`]);
    } catch (err) {
      throw new Error(`Error al buscar el usuario por teléfono: ${err.message}`);
    }
  }

  // Buscar usuario por correo (autocompletado)
  static async buscarPorCorreo(email) {
    const query = 'SELECT * FROM usuarios WHERE correo LIKE ?';
    try {
      return await dbService.query(query, [`%${email}%`]);
    } catch (err) {
      throw new Error(`Error al buscar el usuario por correo: ${err.message}`);
    }
  }

  // Buscar usuario por rol (autocompletado)
  static async buscarPorRol(r) {
    const query = 'SELECT * FROM usuarios WHERE rol LIKE ?';
    try {
      return await dbService.query(query, [`%${r}%`]);
    } catch (err) {
      throw new Error(`Error al buscar el usuario por rol: ${err.message}`);
    }
  }

  // Crear un nuevo usuario
  static async crearUsuarios(doc, name, tel, email, contras) {
    const query = 'INSERT INTO usuarios (documento, nombres, telefono, correo, contrasena, rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
      // Generar el hash de la contraseña con bcrypt
      const saltRounds = 10; // Nivel de seguridad de encriptación
      const contra = await bcrypt.hash(contras, saltRounds);

      return await dbService.query(query, [doc, name, tel, email, contra, "Cliente", "Activo"]);
    } catch (err) {
      throw new Error(`Error al crear el usuario: ${err.message}`);
    }
  }


  // Modificar un usuario existente
  static async modificarUsuario(id, doc, name, tel, email, contra) {
    const query = 'UPDATE usuarios SET documento = ?, nombres = ?, telefono = ?, correo = ?, contrasena = ? WHERE idUsuario = ?';
    try {
      return await dbService.query(query, [doc, name, tel, email, contra, id]);
    } catch (err) {
      throw new Error(`Error al modificar el usuario: ${err.message}`);
    }
  }

  //*Eliminar un usuario
  static async eliminarUsuario(id) {
    const query = 'DELETE FROM usuarios WHERE idUsuario = ?';
    try {
      return await dbService.query(query, [id]);
    } catch (err) {
      throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
  }

}

module.exports = UsuarioModelo;