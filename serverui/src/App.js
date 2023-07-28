import React, { useState } from "react";
import './App.css';
import { Login } from './Login';
import { Register } from './Register';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) =>{
    setCurrentForm(formName);

  }

  return (
    
    <div className="App">
      {
        currentForm === 'login' ? <Login onFormSwitch={toggleForm}></Login> : <Register onFormSwitch={toggleForm}></Register>
      }
    </div>
  );
}

export default App;
