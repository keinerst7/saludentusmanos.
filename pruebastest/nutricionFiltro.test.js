const request = require('supertest');
const app = require('../app');
const db = require('../modelo/bd/Conexion'); // usamos tu clase Conexion

describe('🧪 Filtro de recetas por información nutricional', () => {
  let recetaTestId;

  beforeAll(async () => {
    // Insertamos una receta que cumpla los filtros
    const [result] = await db.query(`
      INSERT INTO recetas (nombre, descripcion, calorias, proteinas, carbohidratos, grasas, porcion)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['Receta Test', 'Receta para pruebas', 250, 15, 30, 10, '1 porción']
    );
    recetaTestId = result.insertId;
  });

  afterAll(async () => {
    // Limpiamos la base de datos
    await db.query('DELETE FROM recetas WHERE id = ?', [recetaTestId]);
  });

  it('✅ Debería retornar recetas con calorías <= 300', async () => {
    const res = await request(app).get('/api/recetas/filtro/avanzado?caloriasMax=300');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(receta => {
      expect(receta.calorias).toBeLessThanOrEqual(300);
    });
  });

  it('✅ Debería retornar recetas con proteínas >= 10', async () => {
    const res = await request(app).get('/api/recetas/filtro/avanzado?proteinasMin=10');
    expect(res.statusCode).toBe(200);
    res.body.forEach(receta => {
      expect(receta.proteinas).toBeGreaterThanOrEqual(10);
    });
  });

  it('✅ Debería retornar 404 si no hay coincidencias', async () => {
    const res = await request(app).get('/api/recetas/filtro/avanzado?caloriasMax=1&proteinasMin=999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('mensaje', 'No se encontraron recetas con esos filtros');
  });

  it('✅ Debería retornar recetas con calorías <= 500 y proteínas >= 5', async () => {
    const res = await request(app).get('/api/recetas/filtro/avanzado?caloriasMax=500&proteinasMin=5');
    expect(res.statusCode).toBe(200);
    res.body.forEach(receta => {
      expect(receta.calorias).toBeLessThanOrEqual(500);
      expect(receta.proteinas).toBeGreaterThanOrEqual(5);
    });
  });
});
