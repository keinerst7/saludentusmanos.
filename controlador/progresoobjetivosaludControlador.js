const Progreso = require('../modelo/progresoobjetivosaludModelo');

exports.mostrarProgreso = (req, res) => {
    const idUsuario = req.params.idUsuario;
    
    Progreso.obtenerMetasUsuario(idUsuario, (err, metas) => {
        if (err) {
            console.error('Error al obtener metas:', err);
            return res.status(500).render('error', { 
                mensaje: 'Error al cargar tus metas' 
            });
        }
        
        Progreso.obtenerEstadisticas(idUsuario, (err, estadisticas) => {
            if (err) {
                console.error('Error al obtener estadísticas:', err);
                return res.status(500).render('error', { 
                    mensaje: 'Error al cargar estadísticas' 
                });
            }
            
            res.render('progreso', { 
                metas: metas,
                estadisticas: estadisticas,
                idUsuario: idUsuario
            });
        });
    });
};

exports.actualizarProgreso = (req, res) => {
    const { idUsuario, idMeta } = req.params;
    const { valorActual } = req.body;
    
    if (isNaN(valorActual)) {
        return res.status(400).json({ 
            error: 'El valor debe ser un número' 
        });
    }

    Progreso.actualizarProgresoMeta(idMeta, valorActual, (err, result) => {
        if (err) {
            console.error('Error al actualizar:', err);
            return res.status(500).json({ 
                error: 'Error al actualizar el progreso' 
            });
        }
        
        res.json({ 
            success: true,
            message: 'Progreso actualizado correctamente'
        });
    });
};

exports.obtenerDatosGrafico = (req, res) => {
    const idUsuario = req.params.idUsuario;
    
    Progreso.obtenerEstadisticas(idUsuario, (err, estadisticas) => {
        if (err) {
            console.error('Error al obtener datos para gráfico:', err);
            return res.status(500).json({ 
                error: 'Error al obtener datos' 
            });
        }
        
        res.json({
            labels: estadisticas.map(meta => meta.tipometa),
            valoresActuales: estadisticas.map(meta => meta.valoractual),
            valoresObjetivo: estadisticas.map(meta => meta.valorobjetivo)
        });
    });
};
