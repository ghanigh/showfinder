// src/pages/PrivacyPolicy.js
import React from 'react';
import '../styles/sharedStyles.css';

const PrivacyPolicy = ({ onClose }) => {
  return (
    <div className="privacy-policy">
      <button className="close-button" onClick={onClose}>×</button>
      <h1>Politique de Confidentialité</h1>
      <p>
        Chez Showfinder, nous respectons votre vie privée et nous nous engageons à protéger les données personnelles que vous partagez avec nous. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.
      </p>
      <h2>Collecte des Informations</h2>
      <p>
        Nous collectons des informations lorsque vous utilisez notre site, telles que votre nom, adresse email, et autres informations nécessaires pour vous fournir nos services.
      </p>
      <h2>Utilisation des Informations</h2>
      <p>
        Les informations que nous collectons sont utilisées pour personnaliser votre expérience sur notre site, améliorer notre service client, et envoyer des emails périodiques.
      </p>
      <h2>Protection des Informations</h2>
      <p>
        Nous mettons en œuvre une variété de mesures de sécurité pour protéger vos informations personnelles. Vos données sont stockées dans des environnements sécurisés et ne sont accessibles qu'à un nombre limité de personnes.
      </p>
      <p>
        Si vous avez des questions concernant cette politique de confidentialité, n'hésitez pas à nous contacter à : privacy@showfinder.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
