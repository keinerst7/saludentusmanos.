// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const indexDia = require('./router/indexdia');
const UsuariosRutas = require('./router/UsuariosRutas');
const rutaadmin = require('./router/AdministradorRuta');
const actfisicasRouter = require('./router/actividadesfisicas');
const rutaProgresoSalud = require('./router/progresosaludRuta');
const rutaLogros = require('./router/logrosnotificacionesRutas');
const nutricionRuta = require('./router/nutriciondetalladaRuta');
const planesComidaRuta = require('./router/planescomidaRuta');
const rutasRecetaCategoria = require('./router/recetacategoriaRuta');
const alimentosRuta = require('./router/alimentosRuta');
const metasDiariasRuta = require('./router/metasdiariasRuta');
const rutaRutinas = require('./router/rutinasRuta');



// Middleware
app.use(cors({
    origin: '*', // Cambiar ['http://tu.com', 'http://yo.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Habilita el envío de credenciales si es necesario
  }));


// Middleware para parseo de solicitudes
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));


// Rutas
app.use('/', indexDia);
app.use('/usuarios', UsuariosRutas);
app.use('/', rutaadmin);
app.use('/actfisicas', actfisicasRouter);
app.use('/progresosalud', rutaProgresoSalud);
app.use('/logros', rutaLogros);
app.use('/api/recetas', nutricionRuta)
app.use('/api/planescomida', planesComidaRuta);
app.use('/api/recetacategoria', rutasRecetaCategoria);
app.use('/api/alimentos', alimentosRuta);
app.use('/api/metasdiarias', metasDiariasRuta);
app.use('/api/rutinas', rutaRutinas);



// Exportar app para testing
const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;