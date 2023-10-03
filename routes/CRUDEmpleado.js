const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Empleado';
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
    const { Nombres, Apellidos, Telefono, Correo, Cargo } = req.body;
    if (!Nombres || !Apellidos || !Telefono || !Correo || !Cargo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const sql = `
      INSERT INTO Empleado (Nombres, Apellidos, Telefono, Correo, Cargo)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [Nombres, Apellidos, Telefono, Correo, Cargo];
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
    const ID_Empleado = req.params.id;
    const { Nombres, Apellidos, Telefono, Correo, Cargo } = req.body;
    if (!Nombres || !Apellidos || !Telefono || !Correo || !Cargo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const sql = `
      UPDATE Empleado
      SET Nombres = ?, Apellidos = ?, Telefono = ?, Correo = ?, Cargo = ?
      WHERE ID_Empleado = ?
    `;
    const values = [Nombres, Apellidos, Telefono, Correo, Cargo, ID_Empleado];
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
    const ID_Empleado = req.params.id;
    const sql = 'DELETE FROM Empleado WHERE ID_Empleado = ?';
    db.query(sql, [ID_Empleado], (err, result) => {
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

