import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/profile/:id"><i class="fa-solid fa-user"></i>Mon profile</Link>
                </li>
                <li>
                    <Link to="/logout"><i class="fa-solid fa-arrow-right-from-bracket"></i>Se déconnecter</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
