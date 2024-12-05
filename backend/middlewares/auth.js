import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware pour authentifier l'utilisateur via un token JWT
export const authenticate = (req, res, next) => {
  const token = req.cookies.access_token; // Récupère le token du cookie

  // Si aucun token n'est présent, l'accès est refusé
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Vérifie la validité du token avec la clé secrète
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded; // Ajoute les informations de l'utilisateur dans la requête
    next(); // Passe à l'étape suivante du middleware ou de la route
  } catch (error) {
    // Si le token est invalide ou expiré, retourne une erreur 401
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware pour autoriser uniquement les utilisateurs avec le rôle 'admin'
export const authorizeAdmin = (req, res, next) => {
  // Si l'utilisateur n'est pas un admin, l'accès est refusé
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next(); // Si l'utilisateur est un admin, passe à l'étape suivante
};
