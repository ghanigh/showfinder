import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Remplacez useHistory par useNavigate
import '../styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '', // Valeur initiale vide
    age: '', // Valeur initiale vide
    preferences: '', // Valeur initiale vide
    biography: '', // Valeur initiale vide
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ajout de l'état pour vérifier si l'utilisateur est connecté
  const navigate = useNavigate(); // Utilisez useNavigate au lieu de useHistory

  // Vérifier si l'utilisateur est connecté (présence du token)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // Si le token est présent, l'utilisateur est connecté
    } else {
      setIsLoggedIn(false); // Sinon, l'utilisateur n'est pas connecté
    }
  }, []);

  // Gérer la modification des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Gérer l'enregistrement des modifications
  const handleSave = () => {
    console.log('Nouvelles données de l\'utilisateur:', userData);
    setIsEditing(false); // Désactive le mode édition après l'enregistrement
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Exemple avec localStorage
    setIsLoggedIn(false); // Mettez à jour l'état de la connexion
    navigate('/login'); // Redirection vers la page de connexion
  };

  return (
    <div>
      <h1>Profil Utilisateur</h1>

      {/* Affichage du formulaire en fonction du mode d'édition */}
      {isEditing ? (
        <div>
          <div>
            <label>Nom d'utilisateur:</label>
            <input 
              type="text" 
              name="username" 
              value={userData.username} 
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Âge:</label>
            <input 
              type="number" 
              name="age" 
              value={userData.age} 
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Préférences de films:</label>
            <input 
              type="text" 
              name="preferences" 
              value={userData.preferences} 
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Biographie:</label>
            <textarea 
              name="biography" 
              value={userData.biography} 
              onChange={handleChange}
            />
          </div>

          <button onClick={handleSave}>Enregistrer les modifications</button>
        </div>
      ) : (
        <div>
          <p><strong>Nom d'utilisateur:</strong> {userData.username || 'Non renseigné'}</p>
          <p><strong>Âge:</strong> {userData.age || 'Non renseigné'}</p>
          <p><strong>Préférences de films:</strong> {userData.preferences || 'Non renseignées'}</p>
          <p><strong>Biographie:</strong> {userData.biography || 'Non renseignée'}</p>

          <button onClick={() => setIsEditing(true)}>Modifier</button>
        </div>
      )}

      {/* Afficher le bouton de déconnexion uniquement si l'utilisateur est connecté */}
      {isLoggedIn && (
        <button onClick={handleLogout}>Déconnexion</button>
      )}
    </div>
  );
};

export default Profile;
