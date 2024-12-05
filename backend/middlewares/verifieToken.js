import jwt from 'jsonwebtoken'; // Importation du module jsonwebtoken pour la vérification des tokens

// Middleware pour vérifier le token JWT
module.exports = function (req, res, next) {
  // Récupération du token à partir de l'en-tête 'x-auth-token'
  const token = req.header('x-auth-token');

  // Vérification de la présence du token
  if (!token) {
    // Si aucun token n'est fourni, renvoie une réponse avec le code de statut HTTP 401 (Non autorisé)
    return res.status(401).json({ msg: 'Autorisation refusée' });
  }

  try {
    // Vérification de la validité du token avec la clé secrète définie dans les variables d'environnement
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Décodage du token pour extraire les informations de l'utilisateur
    req.user = decoded.user;

    // Passe le contrôle au middleware suivant
    next();
  } catch (err) {
    // En cas d'erreur lors de la vérification du token, renvoie une réponse avec le code de statut HTTP 401 (Non autorisé)
    res.status(401).json({ msg: 'Votre token n\'est pas valide' });
  }
};
