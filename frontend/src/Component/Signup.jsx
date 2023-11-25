import axios from 'axios'
import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [msg, setMsg] = useState()
    const [msg_type, setMsg_type] = useState()

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the signup data to the backend (e.g., using fetch or axios)
        const formData = {
            email,
            password,
            role: selectedRole,
        };

        axios.post('http://localhost:5000/api/signup/assignRole', { email: email, selectedRole: selectedRole, password: password })
            .then(response => {
                console.log(response.data)
                setMsg(response.data.msg)
                setMsg_type(response.data.msg_type)
                setTimeout(() => {
                    setMsg('');
                    setMsg_type('');
                }, 3000);
            })
            .catch(err => console.log(err))
        // axios.post('http://localhost:5000/api/signup', formData)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // Make an API request to your backend signup endpoint
        // fetch('/api/signup', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));

        console.log('Signup form data:', formData);
    };

    return (
        <div className='border shadow py-3'>
            <form onSubmit={handleSubmit} className='px-5' style={{ minWidth: "400px" }}>
                <center>{msg && <div className={`alert mt-2 ${msg_type == 'good' ? 'alert-success' : 'alert-danger'}`}>{msg}</div>}</center>
                <center className='fs-4 fw-bold mt-4'>SignUp Page</center>
                <hr />
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input required
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        required
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="roleSelect" className="form-label">
                        Select Role
                    </label>
                    <select
                        required
                        className="form-select"
                        id="roleSelect"
                        onChange={handleRoleChange}
                        value={selectedRole}
                    >
                        <option value="" disabled>
                            Choose a role
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="Producer">Producer</option>
                        <option value="Consumer">Consumer</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success w-100 mb-2">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
