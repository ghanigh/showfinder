import Comment from '../models/comment.js';

// Récupère tous les commentaires pour un film
export const getAllCommentsByMovie = async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId }) // Cherche les commentaires du film
      .populate('userId') // Ajoute les détails de l'utilisateur
      .populate('replies.userId'); // Ajoute les détails des utilisateurs pour les réponses
    res.status(200).json(comments); // Retourne les commentaires
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des commentaires.' });
  }
};

// Crée un nouveau commentaire
export const createComment = async (req, res) => {
  const { movieId, userId, text } = req.body; // Récupère les données du corps de la requête

  try {
    const newComment = new Comment({
      movieId,
      userId,
      text
    });

    await newComment.save(); // Sauvegarde le commentaire dans la base
    res.status(201).json(newComment); // Retourne le commentaire créé
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la création du commentaire.' });
  }
};

// Ajoute une réponse à un commentaire
export const addReplyToComment = async (req, res) => {
  const { commentId } = req.params; // Récupère l'ID du commentaire
  const { userId, text } = req.body; // Récupère les données du corps de la requête

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $push: { replies: { userId, text } } }, // Ajoute une réponse au tableau des réponses
      { new: true } // Retourne le commentaire mis à jour
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Commentaire non trouvé.' }); // Vérifie si le commentaire existe
    }
    res.status(200).json(updatedComment); // Retourne le commentaire mis à jour
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la réponse.' });
  }
};

// Supprime un commentaire
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id); // Supprime le commentaire par ID
    if (!deletedComment) {
      return res.status(404).json({ message: 'Commentaire non trouvé.' }); // Vérifie si le commentaire existe
    }
    res.status(204).send(); // Envoie une réponse sans contenu
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du commentaire.' });
  }
};
