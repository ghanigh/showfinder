import React, { useState } from 'react';
import '../styles/Footers.css'; 
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy'; 
import CookiesPolicy from '../pages/CookiesPolicy'; 

const Footer = ({ isVisible }) => {
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCookiesPolicy, setShowCookiesPolicy] = useState(false);

  const handleTermsOfServiceClick = () => {
    setShowTermsOfService(true);
  };

  const handlePrivacyPolicyClick = () => {
    setShowPrivacyPolicy(true);
  };

  const handleCookiesPolicyClick = () => {
    setShowCookiesPolicy(true);
  };

  const handleCloseTermsOfService = () => {
    setShowTermsOfService(false);
  };

  const handleClosePrivacyPolicy = () => {
    setShowPrivacyPolicy(false);
  };

  const handleCloseCookiesPolicy = () => {
    setShowCookiesPolicy(false);
  };

  return (
    <>
      {isVisible && (
        <footer className='footer'>
          <div className='footer-content'>
            <p>© 2024 Showfinder. Tous droits réservés.</p>
            <nav>
              <button onClick={handleTermsOfServiceClick}>Conditions d'Utilisation</button> | 
              <button onClick={handlePrivacyPolicyClick}>Politique de Confidentialité</button> | 
              <button onClick={handleCookiesPolicyClick}>Politique des Cookies</button>
            </nav>
          </div>
        </footer>
      )}

      {showTermsOfService && (
        <div className='overlay'>
          <div className='modal-content'>
            <TermsOfService onClose={handleCloseTermsOfService} />
          </div>
        </div>
      )}

      {showPrivacyPolicy && (
        <div className='overlay'>
          <div className='modal-content'>
            <PrivacyPolicy onClose={handleClosePrivacyPolicy} />
          </div>
        </div>
      )}

      {showCookiesPolicy && (
        <div className='overlay'>
          <div className='modal-content'>
            <CookiesPolicy onClose={handleCloseCookiesPolicy} />
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
