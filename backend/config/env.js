// Importation du module dotenv pour charger les variables d'environnement depuis un fichier .env
import dotenv from "dotenv";

// Chargement des variables d'environnement à partir du fichier .env
dotenv.config(); 

// Création d'un objet ENV pour centraliser les variables d'environnement utilisées dans l'application
export const ENV = {
  // Port sur lequel le serveur écoutera les connexions
  PORT: process.env.PORT,

  // URI de connexion à la base de données MongoDB
  MONGO: process.env.MONGO_URI,

  // Nom de la base de données (si applicable)
  DBNAME: process.env.DBNAME,

  TOKEN: process.env.JWT_SECRET

}
