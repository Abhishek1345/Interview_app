const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host:"postgres",
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
   });

client.connect(async (err) => {
    if (err) {
        console.log(err);
        return;
    }

    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE,
                password VARCHAR(255),
                photo_url VARCHAR(255),
                auth_type VARCHAR(255)
            );
        `);

        console.log('Users table ready');
    } catch (e) {
        console.log(e);
    }
});

module.exports = client;