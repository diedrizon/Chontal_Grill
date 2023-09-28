const express = require('express');
const router = express.Router();

module.exports = (db) => {

    router.get('/read', (req, res) => {


        const sql = 'SELECT * From categoria';

        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error al leer registros:', err);
                res.status(500).json({ error: 'Error al leer registros' });
            } else {
                res.status(200).json(result);
            }
        });
    });

    return router;
};
