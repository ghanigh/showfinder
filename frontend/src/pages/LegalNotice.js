import React from 'react';
import '../styles/sharedStyles.css';
const LegalNotice = () => {
  return (
    <div className="legal-notice">
      <h1>Mentions Légales</h1>
      <p>
        Bienvenue sur la page des mentions légales de Showfinder. Voici les informations légales de notre site :
      </p>
      <h2>Informations de l'éditeur</h2>
      <p>
        Nom de l'entreprise : Showfinder Inc.<br />
        Adresse : 123 Rue de l'Exemple, 75000 Paris, France<br />
        Téléphone : +33 1 23 45 67 89<br />
        Email : contact@showfinder.com
      </p>
      <h2>Directeur de publication</h2>
      <p>
        Nom : John Doe<br />
        Email : john.doe@showfinder.com
      </p>
      <h2>Hébergeur du site</h2>
      <p>
        Nom de l'hébergeur : Example Hosting<br />
        Adresse : 456 Avenue de l'Hébergeur, 75000 Paris, France<br />
        Téléphone : +33 1 98 76 54 32<br />
        Email : support@examplehosting.com
      </p>
      <p>
        Pour toute question concernant ces mentions légales, veuillez nous contacter à l'adresse suivante : contact@showfinder.com.
      </p>
    </div>
  );
};

export default LegalNotice;
