const db = require('./bd/Conexion');

const Progreso = {
    obtenerMetasUsuario: (idUsuario, callback) => {
        const sql = `
            SELECT 
                id, 
                idUsuario, 
                tipometa, 
                valorobjetivo, 
                valoractual,
                fechainicio,
                fechafin
            FROM metas 
            WHERE idUsuario = ? 
            ORDER BY fechafin ASC
        `;
        db.query(sql, [idUsuario], (err, results) => {
            if (err) return callback(err);
            
            // Convertir fechas a formato local
            const metas = results.map(meta => {
                return {
                    ...meta,
                    fechainicio: new Date(meta.fechainicio).toLocaleDateString(),
                    fechafin: new Date(meta.fechafin).toLocaleDateString()
                };
            });
            
            callback(null, metas);
        });
    },

    actualizarProgresoMeta: (idMeta, valorActual, callback) => {
        const sql = `
            UPDATE metas 
            SET valoractual = ? 
            WHERE id = ?
        `;
        db.query(sql, [valorActual, idMeta], (err, result) => {
            if (err) return callback(err);
            
            if (result.affectedRows === 0) {
                return callback(new Error('No se encontró la meta especificada'));
            }
            
            callback(null, result);
        });
    },

    obtenerEstadisticas: (idUsuario, callback) => {
        const sql = `
            SELECT 
                id,
                tipometa,
                valorobjetivo,
                valoractual,
                ROUND((valoractual/valorobjetivo)*100, 1) AS porcentajecompletado,
                DATEDIFF(fechafin, CURDATE()) AS diasrestantes,
                CASE 
                    WHEN valoractual >= valorobjetivo THEN 'Completado'
                    WHEN DATEDIFF(fechafin, CURDATE()) <= 0 THEN 'Expirado'
                    ELSE 'En progreso'
                END AS estado
            FROM metas
            WHERE idUsuario = ?
            ORDER BY porcentajecompletado DESC
        `;
        db.query(sql, [idUsuario], callback);
    },

    obtenerHistorialProgreso: (idMeta, callback) => {
        const sql = `
            SELECT 
                DATE_FORMAT(fechacreacion, '%Y-%m-%d') AS fecha,
                valoractual AS valorregistrado
            FROM metas
            WHERE id = ?
            ORDER BY fechacreacion DESC
            LIMIT 30
        `;
        db.query(sql, [idMeta], callback);
    }
};

module.exports = Progreso;