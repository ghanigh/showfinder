// src/components/Recommendation.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [newRecommendation, setNewRecommendation] = useState({ userId: '', movieId: '', moodId: '' });

    // Récupère toutes les recommandations
    const fetchRecommendations = async () => {
        try {
            const response = await axios.get('/api/recommendations');
            setRecommendations(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des recommandations:', error);
        }
    };

    // Crée une nouvelle recommandation
    const handleCreateRecommendation = async () => {
        try {
            const response = await axios.post('/api/recommendations', newRecommendation);
            setRecommendations([...recommendations, response.data]);
            setNewRecommendation({ userId: '', movieId: '', moodId: '' });
        } catch (error) {
            console.error('Erreur lors de la création de la recommandation:', error);
        }
    };

    // Met à jour une recommandation
    const handleUpdateRecommendation = async (id, updatedData) => {
        try {
            const response = await axios.put(`/api/recommendations/${id}`, updatedData);
            setRecommendations(recommendations.map(r => r._id === id ? response.data : r));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la recommandation:', error);
        }
    };

    // Supprime une recommandation
    const handleDeleteRecommendation = async (id) => {
        try {
            await axios.delete(`/api/recommendations/${id}`);
            setRecommendations(recommendations.filter(r => r._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la recommandation:', error);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return (
        <div>
            <h2>Recommandations</h2>

            {/* Formulaire pour ajouter une recommandation */}
            <div>
                <h3>Ajouter une nouvelle recommandation</h3>
                <input
                    type="text"
                    placeholder="ID utilisateur"
                    value={newRecommendation.userId}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, userId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="ID film"
                    value={newRecommendation.movieId}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, movieId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="ID humeur"
                    value={newRecommendation.moodId}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, moodId: e.target.value })}
                />
                <button onClick={handleCreateRecommendation}>Ajouter</button>
            </div>

            {/* Liste des recommandations */}
            <ul>
                {recommendations.map((recommendation) => (
                    <li key={recommendation._id}>
                        <p>Utilisateur : {recommendation.userId}</p>
                        <p>Film : {recommendation.movieId}</p>
                        <p>Humeur : {recommendation.moodId}</p>
                        <button onClick={() => handleUpdateRecommendation(recommendation._id, { ...recommendation, moodId: 'nouvelHumeurId' })}>Mettre à jour</button>
                        <button onClick={() => handleDeleteRecommendation(recommendation._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendation;
