// Importation de Mongoose pour gérer la connexion à MongoDB
import mongoose from 'mongoose';

// Importation de dotenv pour charger les variables d'environnement depuis un fichier .env
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config(); 

// Fonction asynchrone pour établir la connexion à MongoDB
const connectDB = async () => {
  try {
    // Récupération de l'URL de connexion MongoDB depuis les variables d'environnement
    const dbURI = process.env.MONGO_URI;
    
    // Vérification si l'URL de connexion est définie
    if (!dbURI) {
      // Lancer une erreur si l'URL de connexion n'est pas définie
      throw new Error('la db ne répond pas, ressayez ultérieurement');
    }

    // Connexion à MongoDB en utilisant l'URL récupérée
    await mongoose.connect(dbURI);

    // Affichage d'un message de succès si la connexion est établie
    console.log('MongoDB est connecté avec succès! ');
  } catch (err) {
    // Affichage d'un message d'erreur en cas d'échec de la connexion
    console.error(`Error: ${err.message}`);
    // Arrêt du processus avec un code d'erreur (1) pour indiquer un échec
    process.exit(1);
  }
};

// Exportation de la fonction de connexion pour qu'elle puisse être utilisée dans d'autres fichiers
export default connectDB;
