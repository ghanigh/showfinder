import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CombienDeTemps from './pages/CombienDeTemps';
import Humeur from './pages/Humeur';
import ChoixFouS from './pages/ChoixFouS';
import AgeSelection from './pages/AgeSelection';
import ProfileButton from './components/auth/ProfileButton';
import Profile from './pages/Profile';
import AdminPage from './components/admin/Admin';
import SignIn from './components/auth/SingIn';
import SignUp from './components/auth/SingUp';
import Footer from './components/Footer'; 
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [config, setConfig] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLegalNotice, setShowLegalNotice] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  const apiKey = '893fb1986c97f41a3868c76bf2cf6e34';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setConfig(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la configuration:', error);
      });
  }, [apiKey]);

  const handleLogin = () => {
    setIsAuthenticated(true); 
    setIsAdmin(true); 
    setCurrentPage('profile');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentPage('home'); 
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setCurrentPage('duration');
  };

  const handleDurationSelect = (duration) => {
    setCurrentPage('ageSelection');
  };

  const handleAgeSelect = (age) => {
    console.log("Selected age:", age);
    setCurrentPage('mood');
  };

  const handleBackButtonClick = () => {
    setCurrentPage('home');
  };

  const handleTypeSelect = (type) => {
    console.log("Selected type:", type);
  };

  const handleRestartSearch = () => {
    setCurrentPage('home');
    setSelectedPlatform('');
  };

  // Fonction de retour à l'accueil
  const handleReturnToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="App">
      <header>
        <ProfileButton onLogin={handleLogin} onLogout={handleLogout} /> 
        {/* Affichage du bouton Retour à l'accueil uniquement sur la page Profile */}
        {currentPage === 'profile' && (
          <button onClick={handleReturnToHome} className="back-to-home">
            Retour à l'accueil
          </button>
        )}
      </header>

      {/* Affichage conditionnel des pages légales */}
      {showLegalNotice && (
        <div className="legal-notice-container">
          <LegalNotice />
          <button className="close-button" onClick={() => setShowLegalNotice(false)}>×</button>
        </div>
      )}

      {showPrivacyPolicy && (
        <div className="legal-notice-container">
          <PrivacyPolicy />
          <button className="close-button" onClick={() => setShowPrivacyPolicy(false)}>×</button>
        </div>
      )}

      {showTermsOfService && (
        <div className="legal-notice-container">
          <TermsOfService />
          <button className="close-button" onClick={() => setShowTermsOfService(false)}>×</button>
        </div>
      )}

      {/* Pages dynamiques basées sur l'état */}
      {currentPage === 'home' && <HomePage onSelectPlatform={handlePlatformSelect} />}
      {currentPage === 'duration' && <CombienDeTemps onDurationSelect={handleDurationSelect} onBackButtonClick={handleBackButtonClick} />}
      {currentPage === 'ageSelection' && <AgeSelection onAgeSelect={handleAgeSelect} onBackButtonClick={handleBackButtonClick} />}
      {currentPage === 'mood' && <Humeur onDurationSelect={handleDurationSelect} onBackButtonClick={handleBackButtonClick} />}
      {currentPage === 'choixFouS' && <ChoixFouS onSelectType={handleTypeSelect} />}
      {currentPage === 'profile' && isAuthenticated && <Profile />} 
      {currentPage === 'admin' && isAuthenticated && isAdmin && <AdminPage />} 
      {currentPage === 'signin' && <SignIn />} 
      {currentPage === 'signup' && <SignUp />} 

      {currentPage === 'choixFouS' && (
        <button onClick={handleRestartSearch}>Relancer une recherche</button>
      )}

      {/* Routes pour les pages statiques */}
      <Routes>
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>

      <Footer 
        onLegalNoticeClick={() => setShowLegalNotice(true)} 
        onPrivacyPolicyClick={() => setShowPrivacyPolicy(true)} 
        onTermsOfServiceClick={() => setShowTermsOfService(true)}
      />
    </div>
  );
}

export default App;
