// pruebastest/alimentos.test.js
const request = require('supertest');
const app = require('../app');
const pool = require('../modelo/bd/Conexion');

describe('🧪 Pruebas de alimentos', () => {
  let idInsertado = null;

  afterAll(async () => {
    if (idInsertado) {
      await pool.query('DELETE FROM alimentos WHERE id = ?', [idInsertado]);
    }
  });

  it('✅ Debería registrar un alimento', async () => {
    const res = await request(app)
      .post('/api/alimentos/registrar')
      .send({
        idUsuario: 1,
        nombre: 'Manzana',
        calorias: 52,
        proteinas: 0.3,
        grasas: 0.2,
        carbohidratos: 14,
        fecha: '2025-06-30'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensaje', '✅ Alimento registrado correctamente');

    // Guardar ID insertado
    const [filas] = await pool.query('SELECT id FROM alimentos WHERE nombre = ? ORDER BY id DESC LIMIT 1', ['Manzana']);
    idInsertado = filas[0]?.id;
  });

  it('✅ Debería listar alimentos del usuario', async () => {
    const res = await request(app).get('/api/alimentos/listar/1');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('nombre');
    expect(res.body[0]).toHaveProperty('fecha');
  });
});
