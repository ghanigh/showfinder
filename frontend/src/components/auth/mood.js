// src/components/Mood.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mood = () => {
    const [moods, setMoods] = useState([]);
    const [newMood, setNewMood] = useState({ moodName: '', moodDescription: '' });

    // Récupère toutes les humeurs
    const fetchMoods = async () => {
        try {
            const response = await axios.get('/api/moods');
            setMoods(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des humeurs:', error);
        }
    };

    // Crée une nouvelle humeur
    const handleCreateMood = async () => {
        try {
            const response = await axios.post('/api/moods', newMood);
            setMoods([...moods, response.data]);
            setNewMood({ moodName: '', moodDescription: '' });
        } catch (error) {
            console.error('Erreur lors de la création de l\'humeur:', error);
        }
    };

    // Met à jour une humeur
    const handleUpdateMood = async (id, updatedData) => {
        try {
            const response = await axios.put(`/api/moods/${id}`, updatedData);
            setMoods(moods.map(m => m._id === id ? response.data : m));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'humeur:', error);
        }
    };

    // Supprime une humeur
    const handleDeleteMood = async (id) => {
        try {
            await axios.delete(`/api/moods/${id}`);
            setMoods(moods.filter(m => m._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'humeur:', error);
        }
    };

    useEffect(() => {
        fetchMoods();
    }, []);

    return (
        <div>
            <h2>Humeurs</h2>

            {/* Formulaire pour ajouter une humeur */}
            <div>
                <h3>Ajouter une nouvelle humeur</h3>
                <input
                    type="text"
                    placeholder="Nom de l'humeur"
                    value={newMood.moodName}
                    onChange={(e) => setNewMood({ ...newMood, moodName: e.target.value })}
                />
                <textarea
                    placeholder="Description de l'humeur"
                    value={newMood.moodDescription}
                    onChange={(e) => setNewMood({ ...newMood, moodDescription: e.target.value })}
                />
                <button onClick={handleCreateMood}>Ajouter</button>
            </div>

            {/* Liste des humeurs */}
            <ul>
                {moods.map((mood) => (
                    <li key={mood._id}>
                        <h4>{mood.moodName}</h4>
                        <p>{mood.moodDescription}</p>
                        <button onClick={() => handleUpdateMood(mood._id, { ...mood, moodName: 'Nouveau nom' })}>Mettre à jour</button>
                        <button onClick={() => handleDeleteMood(mood._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mood;
