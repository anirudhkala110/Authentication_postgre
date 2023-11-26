import pkg from 'pg';
const { Pool } = pkg;
import doenv from 'dotenv'
import bcrypt from 'bcryptjs';
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASS,
    port: 5432, // default PostgreSQL port
});

const assignRoleToUser = async (email, roleName, password) => {
    // Check if the user already exists for the specified role
    // console.log("Assigning role")
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword, "\n", password)
    const existingRoleQuery = 'SELECT * FROM user_roles WHERE email = $1 AND role = $2';
    const existingRoleValues = [email, roleName];

    const existingRoleResult = await pool.query(existingRoleQuery, existingRoleValues);
    console.log("existingRoleResult ", existingRoleResult)
    if (existingRoleResult.rows.length > 0) {
        // User is already registered for the specified role
        throw new Error(`User is already registered for the role: ${roleName}`);
    }
    // console.log("________________________________")
    // If not, create a new entry for the user and role
    const insertQuery = 'INSERT INTO user_roles (email, role, password) VALUES ($1, $2, $3) RETURNING *';
    const insertValues = [email, roleName, hashedPassword];
    try {
        const result = await pool.query(insertQuery, insertValues);
        return result.rows[0];
    } catch (error) {
        console.error('Error assigning role to user', error);
        throw error;
    }
};

const getUserRoles = async (email) => {
    const query = 'SELECT role FROM user_roles WHERE email = $1';
    const values = [email];

    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            // console.log("result ", result)
            return result.rows.map(row => row.role);
        } else {
            console.log("no entry available")
            return null;
        }
    } catch (error) {
        console.error('Error fetching user roles', error);
        throw error;
    }
};
const getUserRolesforLogin = async (email, role) => {
    const query = 'SELECT password FROM user_roles WHERE email = $1 AND role =$2';
    const values = [email, role];

    try {
        const result = await pool.query(query, values);
        console.log(result)
        if (result.rows.length>0) {
            console.log("result rows password -->", result.rows[0].password)
            return result.rows[0].password;
        } else {
            console.log("no entry available")
            return null;
        }
    } catch (error) {
        console.error('Error fetching user roles', error);
        throw error;
    }
};

export {
    assignRoleToUser,
    getUserRoles,
    getUserRolesforLogin,
};
