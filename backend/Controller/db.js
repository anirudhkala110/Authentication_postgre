import pkg from 'pg';
const { Pool } = pkg;
import doenv from 'dotenv'

doenv.config()

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASS,
    port: 5432,
});

pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((error) => {
        console.error('Error connecting to PostgreSQL database:', error.message);
    })
    .finally(() => {
        pool.end();
    });


export { pool };