// Importation de mongoose pour interagir avec MongoDB
import mongoose from 'mongoose';

// Définition du schéma pour les humeurs
const moodSchema = mongoose.Schema({
  // Identifiant unique de l'humeur (obligatoire et unique)
  moodId: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true,  // Le champ est requis
    unique: true  // L'identifiant doit être unique
  },

  // Nom de l'humeur (obligatoire)
  moodName: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true  // Le champ est requis
  },

  // Identifiant du genre associé à l'humeur (facultatif)
  genreId: {
    type: String,  // Le type de données est une chaîne de caractères (String)
  }
}, { timestamps: true }); // Ajoute automatiquement les champs 'createdAt' et 'updatedAt' à chaque document

// Création du modèle Mood avec le schéma défini
const Mood = mongoose.model('Mood', moodSchema);

// Exportation du modèle Mood pour l'utiliser ailleurs dans l'application
export default Mood;
