import React, { useState } from 'react';
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState(''); // State to store the selected role
    const [msg, setMsg] = useState()
    const [msg_type, setMsg_type] = useState()
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            email,
            password,
            role: selectedRole,
        };

        axios.post('http://localhost:5000/api/login', formData)
            .then(res => {
                console.log(res.data)
                setMsg(res.data.msg)
                setMsg_type(res.data.msg_type)
                setTimeout(() => {
                    setMsg('');
                    setMsg_type('');
                }, 3000);
            })
            .catch(err => {
                console.log(err)
            })
        // Make an API request or perform any other action with the form data
        console.log(formData);
    };

    return (
        <div className='border shadow py-3'>
            <form onSubmit={handleSubmit} className='px-5' style={{ minWidth: "400px" }}>
                <center>{msg && <div className={`alert mt-2 ${msg_type == 'good' ? 'alert-success' : 'alert-danger'}`}>{msg}</div>}</center>
                <center className='fs-4 fw-bold mt-4'>Login Page</center>
                <hr />
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label fw-semibold">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control rounded-0"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label fw-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control rounded-0"
                        id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="roleSelect" className="form-label fw-semibold">
                        Select Role
                    </label>
                    <select
                        className="form-select"
                        id="roleSelect"
                        onChange={handleRoleChange}
                        value={selectedRole}
                        required>
                        <option value="" disabled>
                            Choose a role
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="Producer">Producer</option>
                        <option value="Consumer">Consumer</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
