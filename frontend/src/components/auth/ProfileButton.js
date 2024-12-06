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

  // Fonction pour naviguer vers le profil et fermer la modale
  const navigateToProfile = () => {
    onLogin(); // Appelle la fonction de connexion
    setIsSidebarOpen(false); // Ferme la modale
    navigate('/profile'); // Navigue vers la page de profil
  };

  // Fonction pour fermer la modale après l'inscription ou la connexion
  const handleSuccess = () => {
    setIsSidebarOpen(false); // Fermer la modale après connexion ou inscription
  };

  return (
    <>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`modal ${isSidebarOpen ? 'active' : ''}`}>
        <div className="modal-content">
          {isSignIn ? (
            <SignIn onSuccess={handleSuccess} /> // Passer la fonction handleSuccess au composant SignIn
          ) : (
            <SignUp onSuccess={handleSuccess} /> // Passer la fonction handleSuccess au composant SignUp
          )}
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
