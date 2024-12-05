import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/SingIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // État pour le message de succès
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Stockage du token d'authentification dans le localStorage
      localStorage.setItem('authToken', JSON.stringify(data.token));

      setError('');
      setSuccessMessage('Connexion réussie !'); // Affiche le message de succès

      // Attends un peu avant de rediriger
      setTimeout(() => {
        setSuccessMessage(''); // Masque le message de succès après redirection
        navigate('/profile');
      }, 2000); // Redirection après 2 secondes
    } catch (error) {
      setError('Erreur lors de la connexion');
      setSuccessMessage(''); // Réinitialise le message de succès en cas d'erreur
    }
  };

  return (
    <div className="sign-in">
      <h2>Connexion</h2>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Affiche le message de succès */}
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
    </div>
  );
};

export default SignIn;
