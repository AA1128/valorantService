import React, { useState } from "react";



export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit = async(e) =>{
        e.preventDefault();

        const dataToSend = {
            email: email,
            password: password
        }

        fetch('http://localhost:4000/api/v1/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then((response) => {
            if(!response.ok){
                if(response.status === 400){
                    return response.json().then((data) => {
                        throw new Error(data.error);
                    })
                }
            }
            return response.json().then((data) =>{
                setMessage('succesful login!');
            })
          
        })
            
    }

    return(
        <div className="auth-form-container">
            <h2>Login</h2>
            <p>{message}</p>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@email.com" id="email" name="email"></input>
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*******" id="password" name="password"></input>
            <button type="submit">Log In</button>
        </form>
        <button className="link=btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here</button>
        </div>
    )
}