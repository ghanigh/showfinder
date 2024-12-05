// src/pages/CookiesPolicy.js
import React from 'react';
import '../styles/sharedStyles.css';

const CookiesPolicy = ({ onClose, onAccept, onReject }) => {
  return (
    <div className="cookies-policy">
      <button className="close-button" onClick={onReject}>×</button>
      <h1>Politique des Cookies</h1>
      <p>
        Nous utilisons des cookies pour améliorer votre expérience sur notre site. Les cookies sont des fichiers texte stockés sur votre appareil qui nous aident à personnaliser votre visite et à analyser l'utilisation du site.
      </p>
      <h2>Gestion des Cookies</h2>
      <p>
        Vous pouvez gérer vos cookies via les paramètres de votre navigateur. Pour plus de détails sur les cookies et leur gestion, consultez les instructions de votre navigateur.
      </p>
      <h2>Cookies Tiers</h2>
      <p>
        Nous utilisons également des cookies tiers pour des services analytiques et publicitaires. Ces cookies sont placés par des partenaires de confiance.
      </p>
      <h2>Modifications</h2>
      <p>
        Nous pouvons mettre à jour cette politique. Consultez-la régulièrement pour rester informé des changements.
      </p>
      <div className="cookies-buttons">
        <button className="accept-button" onClick={onAccept}>J'accepte</button>
        <button className="reject-button" onClick={onReject}>Je refuse</button>
      </div>
    </div>
  );
};

export default CookiesPolicy;
