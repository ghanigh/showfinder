import mongoose from 'mongoose';

// Définition du schéma pour les commentaires
const commentSchema = new mongoose.Schema({
  // Texte du commentaire, requis pour chaque commentaire
  text: {
    type: String,
    required: true
  },
  
  // Référence à l'utilisateur qui a écrit le commentaire
  user: {
    type: mongoose.Schema.Types.ObjectId,  // L'ID de l'utilisateur
    ref: 'User',  // Référence au modèle 'User' pour obtenir les détails de l'utilisateur
    required: true  // L'utilisateur est requis pour chaque commentaire
  },
  
  // Référence au film auquel le commentaire est associé
  movie: {
    type: mongoose.Schema.Types.ObjectId,  // L'ID du film
    ref: 'Movie',  // Référence au modèle 'Movie' pour récupérer les informations du film
    required: true  // Le film est requis pour chaque commentaire
  },

  // Date de création du commentaire, par défaut la date actuelle
  createdAt: {
    type: Date,
    default: Date.now  // Par défaut, l'heure actuelle est utilisée
  }
});

// Création du modèle Comment avec le schéma défini
const Comment = mongoose.model('Comment', commentSchema);

// Exportation du modèle Comment pour l'utiliser dans d'autres parties de l'application
export default Comment;
