import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import '../../styles/Navbar.css';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Gérer l'état de la modale

  // Fonction pour ouvrir et fermer la modale
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Fonction pour fermer la modale après la connexion ou l'inscription
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">SHOWFINDER</Link>
        <div className="auth-links">
          {/* Ouvrir ou fermer la modale lors du clic */}
          <button onClick={toggleModal}>
            Se connecter / S'inscrire
          </button>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                {/* Passer la fonction closeModal aux composants SignIn et SignUp */}
                <SignIn onLoginSuccess={closeModal} />
                <SignUp onSignupSuccess={closeModal} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
