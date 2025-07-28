const request = require('supertest');
const app = require('../app');

describe('🧪 Pruebas de metasdiarias', () => {
  let idInsertado = null;

  const nuevaMeta = {
    idUsuario: 1,
    nombre: 'Dormir 8 horas',
    descripcion: 'Descanso adecuado cada noche',
    tipo: 'sueño',
    valor: 8,
    unidad: 'horas',
    fecha: '2025-07-01'
  };

  it('✅ Crear una meta diaria', async () => {
    const res = await request(app).post('/api/metasdiarias').send(nuevaMeta);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    idInsertado = res.body.id;
  });

  it('✅ Listar metas del usuario', async () => {
    const res = await request(app).get('/api/metasdiarias/1');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('✅ Actualizar la meta diaria', async () => {
    const res = await request(app).put(`/api/metasdiarias/${idInsertado}`).send({
      nombre: 'Dormir 7 horas',
      descripcion: 'Dormir un poco menos',
      tipo: 'sueño',
      valor: 7,
      unidad: 'horas',
      fecha: '2025-07-02'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toMatch(/actualizada/i);
  });

  it('✅ Eliminar la meta diaria', async () => {
    const res = await request(app).delete(`/api/metasdiarias/${idInsertado}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toMatch(/eliminada/i);
  });
});