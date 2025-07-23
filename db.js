// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'test_user',
  host: 'localhost',
  database: 'test',
  password: '12345',
  port: 5432,
});

async function getUsers(){
      const result = await pool.query('SELECT * FROM users');
      return result;
}

async function getMessages() {
  const result = await pool.query('SELECT * FROM messages')
  return result.rows
}

async function postMessage(mensaje) {
    if (!mensaje || typeof mensaje !== 'string') {
    throw new Error('Mensaje inválido');
  }

  const result = await pool.query(
  'INSERT INTO messages (date, text) VALUES (NOW(), $1)',
  [mensaje]
  );

  console.log("mensaje añadido")
}

function truncateMessages() {
  pool.query('TRUNCATE messages')
}

module.exports = {
  pool,
  getUsers,
  getMessages,
  postMessage,
  truncateMessages
};