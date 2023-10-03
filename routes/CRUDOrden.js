const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Orden';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  router.post('/create', (req, res) => {
    const {
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Modo_Pago,
      Fecha_Hora
    } = req.body;

    if (
      !ID_Cliente ||
      !ID_Empleado ||
      !Id_Tipo_Orden ||
      !Monto ||
      !Estado ||
      !Modo_Pago ||
      !Fecha_Hora
    ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
      INSERT INTO Orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Monto, Estado, Modo_Pago, Fecha_Hora)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Modo_Pago,
      Fecha_Hora
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });

  router.put('/update/:id', (req, res) => {
    const ID_Orden = req.params.id;
    const {
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Modo_Pago,
      Fecha_Hora
    } = req.body;

    if (
      !ID_Cliente ||
      !ID_Empleado ||
      !Id_Tipo_Orden ||
      !Monto ||
      !Estado ||
      !Modo_Pago ||
      !Fecha_Hora
    ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
      UPDATE Orden
      SET ID_Cliente = ?, ID_Empleado = ?, Id_Tipo_Orden = ?, Monto = ?, Estado = ?, Modo_Pago = ?, Fecha_Hora = ?
      WHERE ID_Orden = ?
    `;

    const values = [
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Modo_Pago,
      Fecha_Hora,
      ID_Orden
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  router.delete('/delete/:id', (req, res) => {
    const ID_Orden = req.params.id;
    const sql = 'DELETE FROM Orden WHERE ID_Orden = ?';
    db.query(sql, [ID_Orden], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  return router;
};
