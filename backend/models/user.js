// Importation de mongoose pour interagir avec la base de données MongoDB
import mongoose from 'mongoose';

// Définition du schéma pour les utilisateurs
const userSchema = mongoose.Schema({
  // Le nom d'utilisateur de l'utilisateur (chaîne de caractères)
  username: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true,  // Le champ est requis
    unique: true,  // Le nom d'utilisateur doit être unique dans la base de données
  },

  // L'email de l'utilisateur (chaîne de caractères)
  email: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true,  // Le champ est requis
    unique: true,  // L'email doit être unique dans la base de données
  },

  // Le mot de passe de l'utilisateur (chaîne de caractères)
  password: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    required: true,  // Le champ est requis
  },

  // Le rôle de l'utilisateur, soit 'user' soit 'admin'
  role: {
    type: String,  // Le type de données est une chaîne de caractères (String)
    enum: ['user', 'admin'],  // Le rôle peut être soit 'user' soit 'admin'
    default: 'user',  // Valeur par défaut : 'user'
  },

  // Les préférences de l'utilisateur, notamment ses genres de films préférés
  preferences: {
    genres: {
      type: [String],  // Un tableau de chaînes de caractères pour les genres
      default: [],  // Valeur par défaut : un tableau vide
    },
  },

  // La date de création du compte utilisateur (par défaut la date actuelle)
  createdAt: {
    type: Date,  // Le type de données est une date (Date)
    default: new Date(),  // Valeur par défaut : la date actuelle
  },
});

// Création du modèle User avec le schéma défini
const User = mongoose.model('User', userSchema);

// Exportation du modèle User pour l'utiliser ailleurs dans l'application
export default User;
