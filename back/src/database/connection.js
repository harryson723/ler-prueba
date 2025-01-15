const { Pool } = require('pg');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../config');


const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: 5432,
  database: DB_NAME,
});

const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); // Termina la aplicación si no hay conexión
  }
};

module.exports = { pool, connectToDatabase };
