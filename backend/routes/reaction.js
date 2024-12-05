import express from 'express';
import {
  getAllReactions,
  getReactionById,
  createReaction,
  updateReaction,
  deleteReaction
} from '../controllers/reaction.controller.js'; // Importation des fonctions du contrôleur des réactions

const router = express.Router(); // Création d'une instance du routeur Express

// Route GET pour récupérer toutes les réactions
router.get('/', getAllReactions);

// Route GET pour récupérer une réaction par son ID
router.get('/:id', getReactionById);

// Route POST pour créer une nouvelle réaction (like/dislike)
router.post('/', createReaction);

// Route PUT pour mettre à jour une réaction existante
router.put('/:id', updateReaction);

// Route DELETE pour supprimer une réaction par son ID
router.delete('/:id', deleteReaction);

export default router; // Exportation du routeur pour l'utiliser dans l'application
