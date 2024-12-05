// Importation de mongoose pour interagir avec la base de données MongoDB
import mongoose from 'mongoose';

// Définition du schéma pour les réactions des utilisateurs sur les films (like / dislike)
const reactionSchema = mongoose.Schema({
  // Identifiant unique pour chaque réaction
  reactionId: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true,  // Le champ est requis
    unique: true  // L'identifiant doit être unique dans la collection
  },

  // L'utilisateur ayant effectué la réaction (référence au modèle User)
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Le type de données est un ObjectId qui référence un utilisateur
    ref: 'User',  // La référence au modèle 'User' pour lier l'utilisateur
    required: true  // Le champ est requis
  },

  // Le film sur lequel l'utilisateur a réagi (référence au modèle Movie)
  movieId: {
    type: mongoose.Schema.Types.ObjectId,  // Le type de données est un ObjectId qui référence un film
    ref: 'Movie',  // La référence au modèle 'Movie' pour lier le film
    required: true  // Le champ est requis
  },

  // Le type de réaction : 'like' ou 'dislike'
  reactionType: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    enum: ['like', 'dislike'],  // Les types de réaction autorisés sont 'like' ou 'dislike'
    required: true  // Le champ est requis
  },

  // Horodatage de la réaction, avec la valeur par défaut à l'heure actuelle
  timestamp: {
    type: Date,  // Le type de données est une date (Date)
    default: Date.now  // Valeur par défaut : l'heure actuelle lors de la création de la réaction
  }
}, { timestamps: true });  // Ajoute automatiquement les champs 'createdAt' et 'updatedAt'

// Création du modèle Reaction avec le schéma défini
const Reaction = mongoose.model('Reaction', reactionSchema);

// Exportation du modèle Reaction pour l'utiliser ailleurs dans l'application
export default Reaction;
