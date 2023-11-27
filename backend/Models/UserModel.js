import { pool } from '../Controller/db.js'
import bcrypt from 'bcryptjs';

const createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const values = [email, hashedPassword];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

export { createUser, getUserByEmail, comparePasswords };
