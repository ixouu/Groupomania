import React from 'react';
import { ReactComponent as Logo } from "../images/logo.svg";
import { Link } from 'react-router-dom';

const Error = () => {

    window.title = 'GROUPOMANIA | 404'

    return (
        <>
            <div className="error-logo">
                <Logo />
            </div>
            <main className='error-main'>
                <h1>DÉSOLÉ</h1>
                <h2>Cette page n'existe pas (plus).</h2>
                <h3>Retournez sur <Link to="/">la page d'acceuil de Groupomania</Link>.</h3>
            </main>
        </>
    );
}

export default Error;
