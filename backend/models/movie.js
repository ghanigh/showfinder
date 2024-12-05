// Importation de mongoose pour interagir avec la base de données MongoDB
import mongoose from 'mongoose';

// Définition du schéma pour les films
const movieSchema = mongoose.Schema({
  // Identifiant unique du film (requis et unique)
  movieId: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true,  // Le champ est requis
    unique: true  // L'identifiant doit être unique dans la collection
  },

  // Titre du film (obligatoire)
  title: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true  // Le champ est requis
  },

  // Description du film (obligatoire)
  overview: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true  // Le champ est requis
  },

  // Liste des genres associés au film (obligatoire)
  genres: {
    type: [String],  // Le type de données est un tableau de chaînes de caractères (String)
    required: true  // Le champ est requis
  },

  // Date de sortie du film (obligatoire)
  releaseDate: {
    type: Date,  // Le type de données est une date (Date)
    required: true  // Le champ est requis
  },

  // Fournisseurs de services de visionnage du film (obligatoire)
  watchProviders: {
    type: [String],  // Le type de données est un tableau de chaînes de caractères (String)
    required: true  // Le champ est requis
  }
}, { timestamps: true });  // Ajoute automatiquement les champs 'createdAt' et 'updatedAt'

// Création du modèle Movie avec le schéma défini
const Movie = mongoose.model('Movie', movieSchema);

// Exportation du modèle Movie pour l'utiliser ailleurs dans l'application
export default Movie;
