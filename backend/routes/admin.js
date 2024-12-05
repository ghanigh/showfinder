// Importation des modules nécessaires
import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/auth.js'; // Middleware d'authentification et d'autorisation

// Création d'un routeur express
const router = express.Router();

// Route protégée pour accéder au tableau de bord de l'administrateur
router.get('/dashboard', authenticate, authorizeAdmin, (req, res) => {
  // Si l'utilisateur est authentifié et autorisé (role 'admin'), renvoie une réponse avec un message de bienvenue
  res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

// Exportation du routeur pour l'utiliser ailleurs dans l'application
export default router;
