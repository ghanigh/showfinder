import express from 'express';
import {
  getAllCommentsByMovie,
  createComment,
  addReplyToComment,
  deleteComment
} from '../controllers/comment.controller.js'; // Importation des contrôleurs des commentaires

const router = express.Router();

// Route GET pour récupérer tous les commentaires d'un film spécifique
router.get('/movie/:movieId', getAllCommentsByMovie);

// Route POST pour créer un nouveau commentaire
router.post('/', createComment);

// Route POST pour ajouter une réponse à un commentaire existant
router.post('/:commentId/reply', addReplyToComment);

// Route DELETE pour supprimer un commentaire
router.delete('/:id', deleteComment);

export default router; // Exportation du routeur pour l'utiliser dans l'application
