import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { createUser, getUserByEmail, comparePasswords } from './Models/UserModel.js'; // Adjust the path accordingly
import { assignRoleToUser, getUserRoles, getUserRolesforLogin } from './Models/RoleModel.js'; // Update this path to the actual path of your module


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Checking the Connection
app.get('/', (req, res) => {
    return res.json("Successfully connected to the backend NodeJS + Postgre");
});
//SignUp
app.post('/api/signup', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            const existingRoles = await getUserRoles(email);
            if (existingRoles && existingRoles.includes(role)) {
                // User already registered for the specified role
                return res.json({ msg: `User already registered for the role: ${role}`, msg_type: "error" });
            }
            const result = await assignRoleToUser(email, role, password);
            res.json({ msg: `Role ${result.role} assigned to user with email ${result.email}`, msg_type: "good" });
        }
        else {
            // Create a new user
            const newUser = await createUser(email, password);
            const result = await assignRoleToUser(email, role, password);
            // Return a success message or user details
            res.json({ success: true, user: newUser });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//Login
app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;

    if(!email){
        return res.json({ msg: "Enter correct email !", msg_type: "error" })
    }
    if(!password){
        return res.json({ msg: "Invalid Password !", msg_type: "error" })
    }
    if(!role){
        return res.json({ msg: "Role not selected !", msg_type: "error" })
    }

    try {
        const existingRolespass = await getUserRolesforLogin(email, role);
        if (existingRolespass) {
            const passwordMatch = await comparePasswords(password, existingRolespass);
            if (passwordMatch === false) {
                // res.status(401).json({ error: 'Invalid password.' });
                return res.json({ msg: "Invalid Password !", msg_type: "error" })
            }
            else {
                const token = jwt.sign({ email, role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                // res.json({ token });
                return res.json({ msg: "Successfuly Logged in.", msg_type: "good" })
            }
        }
        else {
            return res.json({ msg: `Email does not exists for ${role}`, msg_type: "error" })
        }

        // Assuming authentication is successful, create a JWT token

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
