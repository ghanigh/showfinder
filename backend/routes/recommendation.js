import express from 'express';
import {
  getAllRecommendations,
  getRecommendationById,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation
} from '../controllers/recommendation.controller.js'; // Importation des fonctions du contrôleur des recommandations

const router = express.Router(); // Création d'une instance du routeur Express

// Route GET pour récupérer toutes les recommandations
router.get('/', getAllRecommendations);

// Route GET pour récupérer une recommandation par son ID
router.get('/:id', getRecommendationById);

// Route POST pour créer une nouvelle recommandation
router.post('/', createRecommendation);

// Route PUT pour mettre à jour une recommandation existante
router.put('/:id', updateRecommendation);

// Route DELETE pour supprimer une recommandation par son ID
router.delete('/:id', deleteRecommendation);

export default router; // Exportation du routeur pour l'utiliser dans l'application
