const request = require('supertest');
const app = require('../app'); // asegúrate de exportar `app` en app.js
const pool = require('../modelo/bd/Conexion');

let planId;

describe('🧪 Planificación de comidas - CRUD', () => {

  afterAll(async () => {
    await pool.query('DELETE FROM planescomida WHERE id = ?', [planId]);
    await pool.cerrar(); // cerrar conexión si tu clase lo permite
  });

  it('✅ Debería crear un plan de comidas', async () => {
    const res = await request(app).post('/api/planescomida').send({
      idUsuario: 2,
      nombre: 'Plan Test Supertest',
      objetivo: 'Probar el test',
      caloriasMeta: 2000,
      proteinasMeta: 100,
      grasasMeta: 70,
      carbohidratosMeta: 300,
      fechaInicio: '2025-07-01',
      fechaFin: '2025-07-31'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    planId = res.body.id;
  });

  it('✅ Debería obtener todos los planes', async () => {
    const res = await request(app).get('/api/planescomida');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('✅ Debería obtener el plan por ID', async () => {
    const res = await request(app).get(`/api/planescomida/${planId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', planId);
  });

  it('✅ Debería actualizar el plan', async () => {
    const res = await request(app).put(`/api/planescomida/${planId}`).send({
      nombre: 'Plan Actualizado',
      objetivo: 'Actualizar test',
      caloriasMeta: 2100,
      proteinasMeta: 110,
      grasasMeta: 60,
      carbohidratosMeta: 280,
      fechaInicio: '2025-07-01',
      fechaFin: '2025-08-01'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje', 'Plan actualizado correctamente');
  });

  it('✅ Debería eliminar el plan', async () => {
    const res = await request(app).delete(`/api/planescomida/${planId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje', 'Plan eliminado correctamente');
  });
});
