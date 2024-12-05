import express from 'express';
import {
  getAllMoods,
  getMoodById,
  createMood,
  updateMood,
  deleteMood
} from '../controllers/mood.controller.js'; // Importation des fonctions du contrôleur des humeurs

const router = express.Router();

// Route GET pour récupérer toutes les humeurs
router.get('/', getAllMoods);

// Route GET pour récupérer une humeur par son ID
router.get('/:id', getMoodById);

// Route POST pour créer une nouvelle humeur
router.post('/', createMood);

// Route PUT pour mettre à jour une humeur existante
router.put('/:id', updateMood);

// Route DELETE pour supprimer une humeur par son ID
router.delete('/:id', deleteMood);

export default router; // Exportation du routeur pour l'utiliser dans l'application
