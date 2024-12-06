import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/SingIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/profile'); // Redirection vers la page de profil après 2 secondes
      }, 2000);
    } catch (error) {
      setError('Erreur lors de la connexion');
      setSuccessMessage('');
    }
  };

  return (
    <div className="sign-in">
      <h2>Connexion</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
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
