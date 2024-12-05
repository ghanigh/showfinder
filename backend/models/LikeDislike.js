// Importation de mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition du schéma pour les films
const movieSchema = new mongoose.Schema({
  // Titre du film, requis pour chaque film
  title: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true,  // Le titre est requis
  },

  // Description du film (facultatif)
  description: String,

  // Date de sortie du film (facultatif)
  releaseDate: Date,

  // Nombre de likes du film, initialisé à 0 par défaut
  likes: {
    type: Number,  // Le type de données est un nombre (Number)
    default: 0,  // Par défaut, le nombre de likes est 0
  },

  // Nombre de dislikes du film, initialisé à 0 par défaut
  dislikes: {
    type: Number,  // Le type de données est un nombre (Number)
    default: 0,  // Par défaut, le nombre de dislikes est 0
  },
});

// Création du modèle Movie avec le schéma défini
module.exports = mongoose.model('Movie', movieSchema);
