import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()                      //to avoid page from reloading
        try {
            const { name, email, password, cpassword } = credentials
            if (password === cpassword) {
                const response = await fetch('http://localhost:5000/api/auth/createUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password })
                })
                const json = await response.json()
                console.log(json.status)

                if (json.status === "successful") {
                    localStorage.setItem('token', json.jwtData);
                    navigate("/login");
                    props.showAlert("Account created successfully", "success")
                }else{
                    props.showAlert("Account already exists.", "danger")
                }
            } else {
                console.log("Password does not match")
                props.showAlert("Invalid credentials", "danger")
            }
        } catch (error) {
            console.log(error)
        }

    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} required />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )

}

export default Signup