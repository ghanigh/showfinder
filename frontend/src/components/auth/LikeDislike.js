import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeDislike = ({ movieId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    // Charger le nombre initial de likes et de dislikes pour le film
    const fetchLikesDislikes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
        setLikes(response.data.likes);
        setDislikes(response.data.dislikes);
      } catch (error) {
        console.error('Erreur lors du chargement des likes et dislikes:', error);
      }
    };
    fetchLikesDislikes();
  }, [movieId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/likes/like`, { movieId });
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/likes/dislike`, { movieId });
      setDislikes(response.data.dislikes);
    } catch (error) {
      console.error('Erreur lors du dislike:', error);
    }
  };

  return (
    <div className="like-dislike-container">
      <button onClick={handleLike}>👍 {likes}</button>
      <button onClick={handleDislike}>👎 {dislikes}</button>
    </div>
  );
};

export default LikeDislike;
