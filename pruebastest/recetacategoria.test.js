// pruebastest/recetacategoria.test.js
const request = require('supertest');
const app = require('../app');
const pool = require('../modelo/bd/Conexion');

describe('🧪 Pruebas de recetacategoria', () => {
  const idReceta = 1002;
  const idCategoria = 1;

  beforeAll(async () => {
    // Insertar receta si no existe
    const [recetas] = await pool.query('SELECT * FROM recetas WHERE idReceta = ?', [idReceta]);
    if (recetas.length === 0) {
      await pool.query(
        'INSERT INTO recetas (idReceta, nombre, descripcion, calorias, proteinas, carbohidratos, grasas, porcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [idReceta, 'Receta Test', 'Descripción test', 300, 10, 20, 5, '1 porción']
      );
    }

    // Insertar categoría si no existe
    const [categorias] = await pool.query('SELECT * FROM categoriasaludable WHERE idCategoria = ?', [idCategoria]);
    if (categorias.length === 0) {
      await pool.query(
        'INSERT INTO categoriasaludable (idCategoria, nombre) VALUES (?, ?)',
        [idCategoria, 'Test Categoria']
      );
    }
  });


  afterAll(async () => {
  try {
    // Eliminar relación primero para evitar error de clave foránea
    await pool.query('DELETE FROM recetacategoria WHERE idReceta = ? AND idCategoria = ?', [idReceta, idCategoria]);

    // Verifica y elimina receta si no está referenciada
    const [rCat] = await pool.query('SELECT * FROM recetacategoria WHERE idReceta = ?', [idReceta]);
    if (rCat.length === 0) {
      await pool.query('DELETE FROM recetas WHERE idReceta = ?', [idReceta]);
    }

    const [cCat] = await pool.query('SELECT * FROM recetacategoria WHERE idCategoria = ?', [idCategoria]);
    if (cCat.length === 0) {
      await pool.query('DELETE FROM categoriasaludable WHERE idCategoria = ?', [idCategoria]);
    }
  } catch (error) {
    console.error('❌ Error en afterAll:', error.message);
  }
});



  it('✅ Asignar categoría a receta', async () => {
    const res = await request(app)
      .post('/api/recetacategoria/asignar')
      .send({ idReceta, idCategoria });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensaje', 'Categoría asignada correctamente');
  });

  it('✅ Validar si receta tiene la categoría', async () => {
    const res = await request(app)
      .get(`/api/recetacategoria/validar/${idReceta}/${idCategoria}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje', '✅ La receta tiene esta categoría');
  });

  it('✅ Listar recetas por categoría', async () => {
    const res = await request(app)
      .get(`/api/recetacategoria/porcategoria/${idCategoria}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.some(receta => receta.idReceta === idReceta)).toBe(true);
  });
});