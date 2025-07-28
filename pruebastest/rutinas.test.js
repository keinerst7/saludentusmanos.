const request = require('supertest');
const app = require('../app');

describe('🧪 Pruebas de planificación de rutinas diarias', () => {
  let idRutina = null;
  const idUsuario = 1;

  test('✅ Crear rutina diaria', async () => {
    const res = await request(app)
      .post('/api/rutinas')
      .send({
        idUsuario,
        actividad: 'Caminata matutina',
        descripcion: 'Caminar 30 minutos al aire libre',
        hora: '06:45:00',
        fecha: '2025-07-05',
        tipo: 'ejercicio'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensaje', '✅ Rutina creada correctamente');
    expect(res.body).toHaveProperty('id');
    idRutina = res.body.id;
  });

  test('✅ Obtener rutinas por usuario', async () => {
    const res = await request(app).get(`/api/rutinas/${idUsuario}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('✅ Actualizar rutina', async () => {
    const res = await request(app)
      .put(`/api/rutinas/${idRutina}`)
      .send({
        actividad: 'Caminata extendida',
        descripcion: 'Caminar 45 minutos en el parque',
        hora: '07:00:00',
        fecha: '2025-07-05',
        tipo: 'ejercicio suave'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje', '✅ Rutina actualizada correctamente');
  });

  test('✅ Eliminar rutina', async () => {
    const res = await request(app).delete(`/api/rutinas/${idRutina}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje', '✅ Rutina eliminada correctamente');
  });
});