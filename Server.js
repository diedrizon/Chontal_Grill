const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection( {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'chontal_grill'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

// Configurar el uso de CORS
app.use(cors());

const crudRoutes = require('./routes/crudRoutes.js')(db);
app.use('/crud', crudRoutes);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Codigo funcionando en el puerto ${port}`);
});