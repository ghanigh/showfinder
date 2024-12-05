// src/pages/TermsOfService.js
import React from 'react';
import '../styles/sharedStyles.css';

const TermsOfService = ({ onClose }) => {
  return (
    <div className="terms-of-service">
      <button className="close-button" onClick={onClose}>×</button>
      <h1>Conditions d'Utilisation</h1>
      <p>
        Bienvenue sur Showfinder. En utilisant notre site, vous acceptez les conditions d'utilisation suivantes. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
      </p>
      <h2>Utilisation du Site</h2>
      <p>
        Vous acceptez d'utiliser notre site uniquement à des fins légales et de manière à ne pas enfreindre les droits de, ou restreindre ou inhiber l'utilisation et la jouissance du site par un tiers.
      </p>
      <h2>Propriété Intellectuelle</h2>
      <p>
        Tous les contenus présents sur ce site (textes, images, logos, etc.) sont la propriété de Showfinder ou de ses partenaires. Toute reproduction, distribution ou modification de ces contenus est interdite sans autorisation préalable.
      </p>
      <h2>Modifications des Conditions</h2>
      <p>
        Showfinder se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les modifications seront publiées sur cette page et prendront effet immédiatement.
      </p>
      <p>
        Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à : terms@showfinder.com.
      </p>
    </div>
  );
};

export default TermsOfService;
