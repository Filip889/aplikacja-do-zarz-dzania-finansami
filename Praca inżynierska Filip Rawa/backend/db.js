const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error("BŁĄD POŁĄCZENIA Z POSTGRES:", err.stack);
    }
    console.log("Połączono z bazą danych Postgres pomyślnie!");
    release();
});

module.exports = pool;