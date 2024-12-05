// src/components/Reaction.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reaction = () => {
    const [reactions, setReactions] = useState([]);
    const [newReaction, setNewReaction] = useState({ userId: '', movieId: '', reactionType: '' });

    // Récupère toutes les réactions
    const fetchReactions = async () => {
        try {
            const response = await axios.get('/api/reactions');
            setReactions(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des réactions:', error);
        }
    };

    // Crée une nouvelle réaction (like ou dislike)
    const handleCreateReaction = async () => {
        try {
            const response = await axios.post('/api/reactions', newReaction);
            setReactions([...reactions, response.data]);
            setNewReaction({ userId: '', movieId: '', reactionType: '' });
        } catch (error) {
            console.error('Erreur lors de la création de la réaction:', error);
        }
    };

    // Met à jour une réaction
    const handleUpdateReaction = async (id, updatedData) => {
        try {
            const response = await axios.put(`/api/reactions/${id}`, updatedData);
            setReactions(reactions.map(r => r._id === id ? response.data : r));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la réaction:', error);
        }
    };

    // Supprime une réaction
    const handleDeleteReaction = async (id) => {
        try {
            await axios.delete(`/api/reactions/${id}`);
            setReactions(reactions.filter(r => r._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la réaction:', error);
        }
    };

    useEffect(() => {
        fetchReactions();
    }, []);

    return (
        <div>
            <h2>Réactions (Likes/Dislikes)</h2>

            {/* Formulaire pour ajouter un réaction */}
            <div>
                <h3>Ajouter une nouvelle réaction</h3>
                <input
                    type="text"
                    placeholder="ID utilisateur"
                    value={newReaction.userId}
                    onChange={(e) => setNewReaction({ ...newReaction, userId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="ID film"
                    value={newReaction.movieId}
                    onChange={(e) => setNewReaction({ ...newReaction, movieId: e.target.value })}
                />
                <select
                    value={newReaction.reactionType}
                    onChange={(e) => setNewReaction({ ...newReaction, reactionType: e.target.value })}
                >
                    <option value="">Sélectionner une réaction</option>
                    <option value="like">Like</option>
                    <option value="dislike">Dislike</option>
                </select>
                <button onClick={handleCreateReaction}>Ajouter</button>
            </div>

            {/* Liste des réactions */}
            <ul>
                {reactions.map((reaction) => (
                    <li key={reaction._id}>
                        <p>Utilisateur : {reaction.userId}</p>
                        <p>Film : {reaction.movieId}</p>
                        <p>Réaction : {reaction.reactionType}</p>
                        <button onClick={() => handleUpdateReaction(reaction._id, { ...reaction, reactionType: 'like' })}>Mettre à jour (Like)</button>
                        <button onClick={() => handleUpdateReaction(reaction._id, { ...reaction, reactionType: 'dislike' })}>Mettre à jour (Dislike)</button>
                        <button onClick={() => handleDeleteReaction(reaction._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reaction;
