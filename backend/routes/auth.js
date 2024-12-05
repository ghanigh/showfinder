// Importation des modules nécessaires
import express from 'express';
import { register, login } from '../controllers/auth.controller.js'; // Importation des contrôleurs pour l'inscription et la connexion

// Création d'un routeur Express
const router = express.Router();

// Route POST pour l'inscription (signup)
router.post('/signup', register);

// Route POST pour la connexion (login)
router.post('/login', login);

// Exportation du routeur pour l'utiliser ailleurs dans l'application
export default router;
