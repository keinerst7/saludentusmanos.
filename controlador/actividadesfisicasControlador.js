// controlador/actividadesfisicasControlador.js
const ActividadFisicaModelo = require('../modelo/actividadesfisicasModelo');

class ActividadFisicaControlador {
  // Obtener todas las actividades físicas
  static async getAll(req, res) {
    try {
      const actividades = await ActividadFisicaModelo.getAll();
      res.json(actividades);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener actividades: ' + err.message });
    }
  }

  // Obtener una actividad física por ID
  static async getOnly(req, res) {
    try {
      const actividad = await ActividadFisicaModelo.getById(req.params.id);
      if (!actividad) return res.status(404).json({ error: 'Actividad no encontrada' });
      res.json(actividad);
    } catch (err) {
      res.status(500).json({ error: 'Error al buscar actividad: ' + err.message });
    }
  }

  // Crear una nueva actividad física
  static async create(req, res) {
  const { idusuario, tipoactividad, duracionminutos, intensidad, caloriasquemadas } = req.body;

  if (!idusuario || !tipoactividad || !duracionminutos || !intensidad || !caloriasquemadas) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const resultado = await ActividadFisicaModelo.create({ idusuario, tipoactividad, duracionminutos, intensidad, caloriasquemadas });
    console.log('Resultado en controlador:', resultado);
    res.status(201).json({ mensaje: 'Actividad creada', id: resultado.insertId });
  } catch (err) {
    console.error('Error en controlador create:', err);
    res.status(500).json({ error: 'Error al crear actividad: ' + err.message });
  }
}



  // Actualizar toda la actividad física (PUT)
  static async update(req, res) {
    const { id } = req.params;
    const { idusuario, tipoactividad, duracionminutos, intensidad, caloriasquemadas } = req.body;

    if (!idusuario || !tipoactividad || !duracionminutos || !intensidad || !caloriasquemadas) {
      return res.status(400).json({ error: 'Faltan datos obligatorios para actualizar' });
    }

    try {
      const resultado = await ActividadFisicaModelo.update(id, { idusuario, tipoactividad, duracionminutos, intensidad, caloriasquemadas });
      if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Actividad no encontrada' });
      res.json({ mensaje: 'Actividad actualizada' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar actividad: ' + err.message });
    }
  }

  // Modificar parcialmente la actividad física (PATCH)
  static async patch(req, res) {
    const { id } = req.params;
    const campos = req.body;

    if (Object.keys(campos).length === 0) {
      return res.status(400).json({ error: 'No se enviaron campos para modificar' });
    }

    try {
      const resultado = await ActividadFisicaModelo.patch(id, campos);
      if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Actividad no encontrada' });
      res.json({ mensaje: 'Actividad modificada parcialmente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al modificar actividad: ' + err.message });
    }
  }

  // Eliminar una actividad física por ID
  static async delete(req, res) {
    const { id } = req.params;

    try {
      const resultado = await ActividadFisicaModelo.delete(id);
      if (resultado.affectedRows === 0) return res.status(404).json({ error: 'Actividad no encontrada' });
      res.json({ mensaje: 'Actividad eliminada' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar actividad: ' + err.message });
    }
  }
}

module.exports = ActividadFisicaControlador;
