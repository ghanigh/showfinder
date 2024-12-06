import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    age: '',
    preferences: '',
    biography: '',
    gender: '',
    phone: '',
    email: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Fonction pour récupérer le profil utilisateur depuis le serveur
  const fetchProfile = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/profile/${email}`);
      setUserData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    }
  };

  // Fonction pour enregistrer les modifications du profil
  const saveProfile = async () => {
    try {
      console.log("Données envoyées:", userData);  // Ajout d'un log
      const response = await axios.put(`http://localhost:5000/api/profile/${userData.email}`, userData);
      console.log('Réponse du serveur:', response.data);  // Ajout d'un log pour la réponse
      alert('Profil mis à jour avec succès !');
      setOriginalData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsLoggedIn(false);
      navigate('/signin');  // Rediriger vers '/signin' si l'utilisateur n'est pas connecté
    } else {
      setIsLoggedIn(true);
    }

    const email = 'user@example.com';  // Remplacez par l'email de l'utilisateur connecté
    fetchProfile(email);  // Récupérer le profil à partir de l'email
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    await saveProfile();  // Appel à la fonction saveProfile pour enregistrer les modifications
  };

  const handleCancel = () => {
    setUserData(originalData); // Restaurer les données originales
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/signin');  // Rediriger vers '/signin' après la déconnexion
  };

  // Si l'utilisateur n'est pas connecté, afficher un message
  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <h1>Veuillez vous connecter pour accéder à votre profil</h1>
        <p>Vous devez être connecté pour pouvoir modifier votre profil.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Profil Utilisateur</h1>

      {isEditing ? (
        <div>
          <div>
            <label>Nom d'utilisateur:</label>
            <input type="text" name="username" value={userData.username} onChange={handleChange} />
          </div>
          <div>
            <label>Âge:</label>
            <input type="number" name="age" value={userData.age} onChange={handleChange} />
          </div>
          <div>
            <label>Préférences de films:</label>
            <input type="text" name="preferences" value={userData.preferences} onChange={handleChange} />
          </div>
          <div>
            <label>Biographie:</label>
            <textarea name="biography" value={userData.biography} onChange={handleChange} />
          </div>
          <div>
            <label>Sexe:</label>
            <select name="gender" value={userData.gender} onChange={handleChange}>
              <option value="">Choisir</option>
              <option value="Male">Homme</option>
              <option value="Female">Femme</option>
              <option value="Other">Autre</option>
            </select>
          </div>
          <div>
            <label>Téléphone:</label>
            <input type="tel" name="phone" value={userData.phone} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} disabled />
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

          {/* Bouton "Modifier" amélioré */}
          <button 
            className="profile-button" 
            onClick={() => setIsEditing(true)} 
            disabled={!isLoggedIn}
          >
            Modifier
          </button>
        </div>
      )}

      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
      )}
    </div>
  );
};

export default Profile;
