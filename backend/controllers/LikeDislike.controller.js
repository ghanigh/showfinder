const Movie = require('../models/LikeDislike');

// Contrôleur pour gérer les likes et dislikes
const likeDislikeController = {
  // Fonction pour liker un film
  likeMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.movieId); // Recherche le film par ID
      if (!movie) {
        return res.status(404).json({ message: 'Film non trouvé' }); // Vérifie si le film existe
      }

      movie.likes += 1; // Augmente le nombre de likes
      await movie.save(); // Sauvegarde les changements
      return res.status(200).json({
        message: 'Vous avez liké ce film', // Retourne un message de succès
        likes: movie.likes, // Retourne le nouveau nombre de likes
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur', error }); // Gère l'erreur en cas de problème
    }
  },

  // Fonction pour disliker un film
  dislikeMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.movieId); // Recherche le film par ID
      if (!movie) {
        return res.status(404).json({ message: 'Film non trouvé' }); // Vérifie si le film existe
      }

      movie.dislikes += 1; // Augmente le nombre de dislikes
      await movie.save(); // Sauvegarde les changements
      return res.status(200).json({
        message: 'Vous avez disliké ce film', // Retourne un message de succès
        dislikes: movie.dislikes, // Retourne le nouveau nombre de dislikes
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur', error }); // Gère l'erreur en cas de problème
    }
  },
};

module.exports = likeDislikeController; // Exporte le contrôleur
