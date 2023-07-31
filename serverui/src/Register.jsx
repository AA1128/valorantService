import React, { useState } from 'react';

export const Register = (props) => {

    const [errorMessage, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    let timer;

    const handleChange = (e) =>{
        const { value } = e.target;
        setEmail(value);

        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            if(!e.target.validity.valid){
                setEmailError('Please enter a valid email address.');
            }else{
                setEmailError('');
            }
        }, 3000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const dataToSend = {
            firstName: firstName,
            lastName: lastName,
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
        .then((response) => {
            if(!response.ok){
                if(response.status === 400){
                    //keep working on error validation
                    return response.json().then((data) => {
                        throw new Error(data.error);
                    })
                }
                if(response.status === 409){
                    return response.json().then((data) => {
                        throw new Error(data.error);
                    })
                }
                return response.json().then((data) =>{
                    throw new Error(data.error);
                })
            }
            return response.json().then((data) => {
                setErrorMessage('user successfull created');
            })

        })
        .then((data) => {
            console.log('API response:', data);
        })
        .catch((error) => {
            setErrorMessage(error.message);
            console.error('Error: ', error);
        })
    }

    return(
        <div className="auth-form-container">
            <h2>Register</h2>
            <p>{errorMessage}</p>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>First Name</label>
            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} id='firstname' placeholder='first name' htmlFor='firstname' name='firstname'></input>
            <label>Last Name</label>
            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} id='lastname' placeholder='last name' htmlFor='lastname' name='lastname'></input>
            <label htmlFor="email">email</label>
            <input value={email} onChange={handleChange} type="email" placeholder="email@email.com" id="email" name="email"></input> {emailError && <p>{emailError}</p>}
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*******" id="password" name="password"></input>
            <button type="submit">register</button>
        </form>
        <button className="link=btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}