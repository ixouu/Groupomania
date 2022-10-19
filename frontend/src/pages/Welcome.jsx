import React from 'react';
import { ReactComponent as Logo } from "../images/logo.svg";
import Login from '../components/Login/Index';

const Welcome = () => {

    document.title = 'Groupomania | Bienvenue'
    return (
        <div className='welcome-container'>
            <div className='welcome-left'>
                <h1 className='welcome-title'> Groupomania, car la communication est indispensable, jamais suffisante</h1>
            </div>
            <div className='welcome-right'>
                <Logo />
                <h2> Bienvenue sur le réseau social Groupomania</h2>
                <Login />
            </div>
        </div>
    );
}

export default Welcome;
