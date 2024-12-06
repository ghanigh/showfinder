import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Profile.css';

const Profile = () => {
  // État pour les données utilisateur, en initialisant les valeurs vides
  const [userData, setUserData] = useState({
    username: '', 
    age: '', 
    preferences: '', 
    biography: '', 
    gender: '', 
    phone: '',   
    email: ''    
  });

  const [isEditing, setIsEditing] = useState(false); // Gérer le mode édition
  const [originalData, setOriginalData] = useState({}); // Stocker les données originales
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Gérer l'état de la connexion
  const navigate = useNavigate(); // Utiliser le hook pour la navigation

  useEffect(() => {
    // Vérifier si un token d'authentification existe dans le stockage local
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // Si token présent, l'utilisateur est connecté
    } else {
      setIsLoggedIn(false); // Sinon, l'utilisateur n'est pas connecté
    }
    
    // Simuler la récupération des données utilisateur (pour l'exemple)
    const savedUserData = {
      username: '',
      age: '',
      preferences: '',
      biography: '',
      gender: '',
      phone: '',
      email: ''
    };
    setUserData(savedUserData); // Mettre à jour les données utilisateur
    setOriginalData(savedUserData); // Sauvegarder les données originales pour annuler les modifications
  }, []);

  // Gérer les changements dans les champs de saisie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Sauvegarder les modifications
  const handleSave = () => {
    console.log('Nouvelles données de l\'utilisateur:', userData);
    setOriginalData(userData); // Mettre à jour les données originales après la sauvegarde
    setIsEditing(false); // Fermer le mode édition
  };

  // Annuler les modifications
  const handleCancel = () => {
    setUserData(originalData); // Revenir aux données originales
    setIsEditing(false); // Fermer le mode édition
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Supprimer le token d'authentification
    setIsLoggedIn(false); // Mettre à jour l'état de la connexion
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <div className="profile-container">
      <h1>Profil Utilisateur</h1>

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
          <div>
            <label>Sexe:</label>
            <select 
              name="gender" 
              value={userData.gender} 
              onChange={handleChange}
            >
              <option value="">Choisir</option>
              <option value="Male">Homme</option>
              <option value="Female">Femme</option>
              <option value="Other">Autre</option>
            </select>
          </div>
          <div>
            <label>Téléphone:</label>
            <input 
              type="tel" 
              name="phone" 
              value={userData.phone} 
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={userData.email} 
              onChange={handleChange}
            />
          </div>

          <button onClick={handleSave}>Enregistrer les modifications</button>
          <button onClick={handleCancel}>Annuler les modifications</button>
        </div>
      ) : (
        <div>
          <p><strong>Nom d'utilisateur:</strong> {userData.username || 'Non renseigné'}</p>
          <p><strong>Âge:</strong> {userData.age || 'Non renseigné'}</p>
          <p><strong>Préférences de films:</strong> {userData.preferences || 'Non renseignées'}</p>
          <p><strong>Biographie:</strong> {userData.biography || 'Non renseignée'}</p>
          <p><strong>Sexe:</strong> {userData.gender || 'Non renseigné'}</p>
          <p><strong>Téléphone:</strong> {userData.phone || 'Non renseigné'}</p>
          <p><strong>Email:</strong> {userData.email || 'Non renseigné'}</p>

          {/* Bouton Modifier toujours visible */}
          <button className="profile-button" onClick={() => setIsEditing(true)}>Modifier</button>
        </div>
      )}

      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
      )}
    </div>
  );
};

export default Profile;
