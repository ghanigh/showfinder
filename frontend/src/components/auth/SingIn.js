import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/SingIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [logoutMessage, setLogoutMessage] = useState(''); // Nouveau state pour le message de déconnexion
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ajout d'un état de connexion
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté à l'ouverture
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Stocker le token d'authentification dans le localStorage
      localStorage.setItem('authToken', JSON.stringify(data.token));

      setError('');
      setSuccessMessage('Connexion réussie !');
      setIsLoggedIn(true); // Mettre à jour l'état pour indiquer que l'utilisateur est connecté

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/profile'); // Redirection vers la page de profil après 2 secondes
      }, 2000);
    } catch (error) {
      setError('Erreur lors de la connexion');
      setSuccessMessage('');
    }
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false); // Mettre à jour l'état pour indiquer que l'utilisateur est déconnecté
    setLogoutMessage('Déconnexion réussie !'); // Afficher le message de déconnexion

    // Après 3 secondes, rediriger vers la page de connexion et enlever le message de déconnexion
    setTimeout(() => {
      setLogoutMessage('');
      navigate('/signin'); // Redirection vers la page de connexion après déconnexion
    }, 3000);
  };

  return (
    <div className="sign-in">
      <h2>Connexion</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      {logoutMessage && <p className="logout-message">{logoutMessage}</p>} {/* Affichage du message de déconnexion */}

      {isLoggedIn ? (
        // Afficher uniquement le bouton Déconnexion si l'utilisateur est connecté
        <div>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      ) : (
        // Afficher la modal de connexion si l'utilisateur n'est pas connecté
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Mot de passe:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Se connecter</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default SignIn;
