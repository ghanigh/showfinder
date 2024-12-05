import express from 'express'; // Importation du module Express pour créer des routes et gérer les requêtes HTTP
import {
    getAllUsers, // Importation de la fonction pour récupérer tous les utilisateurs
    getUserById, // Importation de la fonction pour récupérer un utilisateur par ID
    createUser, // Importation de la fonction pour créer un nouvel utilisateur
    updateUser, // Importation de la fonction pour mettre à jour un utilisateur existant
    deleteUser // Importation de la fonction pour supprimer un utilisateur
} from '../controllers/user.controller.js'; // Importation des contrôleurs utilisateur

const router = express.Router(); // Création d'un nouveau routeur Express

// Route pour récupérer tous les utilisateurs
router.get('/', getAllUsers);

// Route pour récupérer un utilisateur par son ID
router.get('/:id', getUserById);

// Route pour créer un nouvel utilisateur
router.post('/', createUser);

// Route pour mettre à jour un utilisateur existant par son ID
router.put('/:id', updateUser);

// Route pour supprimer un utilisateur par son ID
router.delete('/:id', deleteUser);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
export default router;
