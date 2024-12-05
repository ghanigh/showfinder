import express from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movie.controller.js'; // Importation des fonctions du contrôleur des films

const router = express.Router(); // Création d'une instance du routeur Express

// Route GET pour récupérer tous les films
router.get('/', getAllMovies);

// Route GET pour récupérer un film par son ID
router.get('/:id', getMovieById);

// Route POST pour créer un nouveau film
router.post('/', createMovie);

// Route PUT pour mettre à jour un film existant
router.put('/:id', updateMovie);

// Route DELETE pour supprimer un film par son ID
router.delete('/:id', deleteMovie);

export default router; // Exportation du routeur pour l'utiliser dans l'application
