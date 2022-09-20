import React from 'react';
import {ReactComponent as Logo} from "../../images/logo.svg";
import Navbar from '../Navbar';

const Header = () => {
    return (
        <header>
            <div className="header-logo">
                <Logo className="header-logo"/>
            </div>
            <div className="header-title">
                <h1>Bienvenue</h1>
            </div>
            <Navbar/>
        </header>
    );
}

export default Header;
