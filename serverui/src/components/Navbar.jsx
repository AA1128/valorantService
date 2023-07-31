import React from 'react';
import './Navbar.css'

const Navbar = () => {
    return(
        <nav>
            <div id="logo">
                <p>placeholder</p>

            </div>
            <div id='popUp'>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/about'>About</a></li>
                    <li><a href='/contact'>Contact</a></li>
                </ul>
            </div>
            <div id='userLoginContainer'>
                <div id='userLogin'>
                    <p>ax your home</p>
                    <p>icon here</p>
                    <button>button</button>
                </div>
            </div>
       
         
        </nav>
    )
}




export default Navbar;