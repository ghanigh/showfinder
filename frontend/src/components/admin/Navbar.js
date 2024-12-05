import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../auth/SingIn';
import SignUp from '../auth/SingUp';
import '//frontend/src/styles/Navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">SHOWFINDER</Link>
                <div className="auth-links">
                    <SignIn />
                    <SignUp />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
