const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // usamos variable de entorno
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getMessages: async () => {
    const res = await pool.query('SELECT * FROM messages');
    return res.rows;
  },
  postMessage: async (message) => {
    await pool.query('INSERT INTO messages (text) VALUES ($1)', [message]);
  },
  truncateMessages: async () => {
    await pool.query('TRUNCATE messages');
  }
};
