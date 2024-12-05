import express from 'express';
import { createComment, getCommentsByMovie, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

// Route pour créer un commentaire
router.post('/', createComment);

// Route pour obtenir les commentaires d'un film spécifique
router.get('/:movieId', getCommentsByMovie);

// Route pour supprimer un commentaire spécifique
router.delete('/:commentId', deleteComment);

export default router;
