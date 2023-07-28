import React, { useState } from 'react';

export const Register = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dataToSend = {
            name: name,
            email: email,
            password: password
        }

        fetch('http://localhost:4000/api/v1/register', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('API response:', data);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }

    return(
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>Full name</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} id='name' placeholder='full name' htmlFor='name' name='name'></input>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@email.com" id="email" name="email"></input>
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*******" id="password" name="password"></input>
            <button type="submit">register</button>
        </form>
        <button className="link=btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}