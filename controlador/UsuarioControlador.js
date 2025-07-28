const UsuarioModelo = require('../modelo/UsuarioModelo');

class UsuarioControlador {
  // Obtener todos los usuarios
  static async todoUsuario(req, res) {
    try {
      const users = await UsuarioModelo.todoUsuario();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
    }
  }

  // Buscar usuario por ID
  static async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const user = await UsuarioModelo.buscarPorId(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el usuario' });
    }
  }

  // Buscar usuario por identificación
  static async buscarPorDoc(req, res) {
    const { doc } = req.params;
    try {
      const users = await UsuarioModelo.buscarPorDoc(doc);
      if (!users.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el Usuario' });
    }
  }

  // Buscar usuario por nombre
  static async buscarPorNombres(req, res) {
    const { nom } = req.params;
    try {
      const users = await UsuarioModelo.buscarPorNombres(nom);
      if (!users.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el Usuario' });
    }
  }

  // Buscar usuario por teléfono
  static async buscarPorTelefono(req, res) {
    const { tel } = req.params;
    try {
      const users = await UsuarioModelo.buscarPorTelefono(tel);
      if (!users.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el Usuario' });
    }
  }

  // Buscar usuario por correo
  static async buscarPorCorreo(req, res) {
    const { ema } = req.params;
    try {
      const users = await UsuarioModelo.buscarPorCorreo(ema);
      if (!users.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el Usuario' });
    }
  }

  // Buscar usuario por rol
  static async buscarPorRol(req, res) {
    const { r } = req.params;
    try {
      const users = await UsuarioModelo.buscarPorRol(r);
      if (!users.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al obtener el Usuario' });
    }
  }

  // Crear un nuevo usuario
  static async crearUsuario(req, res) {
    const { doc, name, tel, email, contra } = req.body;
    try {
      const result = await UsuarioModelo.crearUsuarios(doc, name, tel, email, contra);
      res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear el usuario' });
    }
  }

  // Modificar un usuario
  static async editarUsuario(req, res) {
    const { id } = req.params;
    const { doc, name, tel, email, contra } = req.body;
    try {
      const result = await UsuarioModelo.modificarUsuario(id, doc, name, tel, email, contra);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ mensaje: 'Usuario actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al actualizar el Usuario' });
    }
  }

  // Eliminar un usuario
  static async borrarUsuario(req, res) {
    const { id } = req.params;
    try {
      const result = await UsuarioModelo.eliminarUsuario(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al eliminar el Usuario' });
    }
  }
}



module.exports = UsuarioControlador;