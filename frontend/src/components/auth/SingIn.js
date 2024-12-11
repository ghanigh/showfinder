import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/SingIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [logoutMessage, setLogoutMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Stocker le token dans le localStorage
      localStorage.setItem('authToken', data.token);

      setSuccessMessage('Connexion réussie !');
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      console.error('Erreur de connexion:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setLogoutMessage('Déconnexion réussie !');

    setTimeout(() => {
      setLogoutMessage('');
      navigate('/signin');
    }, 3000);
  };

  return (
    <div className="sign-in">
      <h2>Connexion</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {logoutMessage && <p className="logout-message">{logoutMessage}</p>}
      {error && <p className="error">{error}</p>}

      {loading && <p>Chargement...</p>}

      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      ) : (
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
          <button type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      )}
    </div>
  );
};

export default SignIn;