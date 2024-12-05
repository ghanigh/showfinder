import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [data, setData] = useState(null); // Stocke les données récupérées
  const [error, setError] = useState(null); // Stocke les erreurs éventuelles

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupère le token d'authentification depuis le localStorage
        const token = localStorage.getItem('authToken'); // Adapté selon la façon dont vous gérez le token

        // Si le token n'est pas trouvé, gérer le cas
        if (!token) {
          setError('Authentication token is missing.');
          return;
        }

        // Effectuer la requête GET pour récupérer les données de l'admin
        const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}` // Ajoute le token dans les headers pour l'authentification
          }
        });

        setData(response.data); // Mise à jour des données avec la réponse de l'API
      } catch (err) {
        console.error('Error fetching admin data:', err); // Affiche les erreurs détaillées dans la console
        setError('Access denied or failed to fetch data.'); // Message d'erreur général à l'utilisateur
      }
    };

    fetchData(); // Appel de la fonction pour récupérer les données lors du montage du composant
  }, []); // Le tableau vide [] signifie que cet effet est appelé une seule fois, après le premier rendu

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Affiche l'erreur en rouge
  }

  if (!data) {
    return <div>Loading...</div>; // Affiche un message de chargement jusqu'à ce que les données soient récupérées
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Affiche un message de la réponse API, ou un message par défaut */}
      <p>{data.message || 'No data available'}</p>
    </div>
  );
};

export default Admin;
