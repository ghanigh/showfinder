import Comment from '../models/comment.js';

// Crée un commentaire
export const createComment = async (req, res) => {
  const { text, userId, movieId } = req.body; // Récupère les données du corps de la requête

  try {
    const newComment = new Comment({
      text, // Le texte du commentaire
      user: userId, // L'ID de l'utilisateur qui écrit le commentaire
      movie: movieId // L'ID du film auquel appartient le commentaire
    });

    await newComment.save(); // Sauvegarde le commentaire dans la base de données
    res.status(201).json(newComment); // Retourne le commentaire créé
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du commentaire', error }); // Gère l'erreur en cas de problème
  }
};

// Obtient tous les commentaires pour un film
export const getCommentsByMovie = async (req, res) => {
  const { movieId } = req.params; // Récupère l'ID du film à partir des paramètres de la requête

  try {
    const comments = await Comment.find({ movie: movieId }).populate('user', 'name'); // Cherche les commentaires du film et récupère le nom de l'utilisateur
    res.status(200).json(comments); // Retourne les commentaires trouvés
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error }); // Gère l'erreur en cas de problème
  }
};

// Supprime un commentaire
export const deleteComment = async (req, res) => {
  const { commentId } = req.params; // Récupère l'ID du commentaire à supprimer

  try {
    await Comment.findByIdAndDelete(commentId); // Supprime le commentaire par ID
    res.status(200).json({ message: 'Commentaire supprimé avec succès' }); // Retourne un message de succès
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du commentaire', error }); // Gère l'erreur en cas de problème
  }
};
