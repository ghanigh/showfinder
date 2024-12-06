import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware pour authentifier l'utilisateur via un token JWT
export const authenticate = (req, res, next) => {
  const token = req.cookies.access_token; // Récupère le token depuis les cookies

  if (!token) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  try {
    // Vérifie la validité du token avec la clé secrète
    const decoded = jwt.verify(token, process.env.TOKEN);

    // Ajoute les informations de l'utilisateur dans la requête pour les étapes suivantes
    req.user = decoded;

    next(); // Passe à l'étape suivante
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware pour autoriser uniquement les utilisateurs avec le rôle 'admin'
export const authorizeAdmin = (req, res, next) => {
  // Vérifie si le rôle de l'utilisateur est 'admin'
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  next(); // Si l'utilisateur est un admin, passe à l'étape suivante
};
