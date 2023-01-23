import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
    const [credentials, setcredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()                   //to avoid page from reloading
        try {
            //API call
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            const json = await response.json()
            console.log(json.status, json.jwtData)
            setcredentials({email: "", password: ""})
            
            if(json.status){
                localStorage.setItem('token', json.jwtData)
                navigate("/");
                props.showAlert("Login successful", "success")
            }else{
                props.showAlert("Invalid credentials. Please login again", 'danger')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password' required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}