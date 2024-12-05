import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/'); // Redirige vers la page d'accueil
  };

  return (
    <div>
      <h1>Profil Utilisateur</h1>
      <button onClick={handleBackButtonClick}>Retour à l'Accueil</button>
      {/* Autres informations de profil ici */}
    </div>
  );
};

export default Profile;
