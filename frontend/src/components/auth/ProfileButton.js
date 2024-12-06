import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './SingIn'; 
import SignUp from './SingUp';
import '../../styles/ProfileButton.css';

const ProfileButton = ({ onLogin, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true); 
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const navigateToProfile = () => {
    onLogin(); // Appelle la fonction de connexion
    navigate('/profile'); // Navigue vers la page de profil
  };

  return (
    <>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`modal ${isSidebarOpen ? 'active' : ''}`}>
        <div className="modal-content">
          {isSignIn ? <SignIn /> : <SignUp />}
          <button className="toggle-form-btn" onClick={handleToggleForm}>
            {isSignIn ? "Pas encore inscrit? Inscrivez-vous" : "Déjà inscrit? Connectez-vous"}
          </button>
        </div>
      </div>

      {/* Bouton Mon Profil avec icône */}
      <button className="profile-button" onClick={navigateToProfile}></button>
    </>
  );
};

export default ProfileButton;
