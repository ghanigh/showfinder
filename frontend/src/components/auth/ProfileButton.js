import React, { useState } from 'react';
import SignIn from './SingIn'; 
import SignUp from './SingUp';
import '../../styles/ProfileButton.css';

const ProfileButton = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true); // Détermine quel formulaire afficher

  // Fonction pour ouvrir/fermer la modal
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fonction pour basculer entre les formulaires de connexion et d'inscription
  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰ {/* Icône de menu burger */}
      </button>
      <div className={`modal ${isSidebarOpen ? 'active' : ''}`}>
        <div className="modal-content">
          {isSignIn ? <SignIn /> : <SignUp />}
          <button className="toggle-form-btn" onClick={handleToggleForm}>
            {isSignIn ? "Pas encore inscrit? Inscrivez-vous" : "Déjà inscrit? Connectez-vous"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileButton;
