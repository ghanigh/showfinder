import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/SingUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });

      setError('');
      setSuccessMessage('Inscription réussie !');

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/profile'); // Redirection vers la page de profil après 2 secondes
      }, 2000);
    } catch (error) {
      setError('Erreur lors de l\'inscription');
      setSuccessMessage('');
    }
  };

  return (
    <div className="sign-up">
      <h2>Inscription</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
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
        <button type="submit">S'inscrire</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
