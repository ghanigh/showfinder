import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

// Inscription de l'utilisateur
export const register = async (req, res) => {
  const { username, email, password } = req.body; // Récupère les données envoyées dans la requête

  try {
    // Vérifie si tous les champs sont présents
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' }); // Retourne une erreur si des champs sont manquants
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'L\'email est déjà utilisé.' }); // Retourne une erreur si l'email est déjà utilisé
    }

    // Hashage du mot de passe pour plus de sécurité
    const hashedPassword = await bcrypt.hash(password, 12);

    // Création du nouvel utilisateur
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save(); // Sauvegarde l'utilisateur dans la base de données

    // Création d'un token JWT pour l'utilisateur
    const token = jwt.sign({ userId: newUser._id }, ENV.TOKEN, { expiresIn: '1h' });

    // Retourne le token au client pour l'authentification
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' }); // Gère l'erreur serveur si quelque chose échoue
  }
};

// Authentification de l'utilisateur
export const existingUser = async (req, res, next) => {
  try {
    // Recherche l'utilisateur dans la base de données par email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found!"); // Si l'utilisateur n'est pas trouvé, retourne une erreur 404

    // Compare le mot de passe fourni avec celui stocké dans la base de données
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) return res.status(400).json("Wrong Credentials!"); // Si les mots de passe ne correspondent pas, retourne une erreur

    // Création d'un token JWT avec l'ID de l'utilisateur pour l'authentification
    const token = jwt.sign({ id: user._id }, ENV.TOKEN, { expiresIn: "24h" });

    // Exclut le mot de passe des informations retournées
    const { password, ...others } = user._doc;

    // Crée un cookie sécurisé avec le token JWT pour la session de l'utilisateur
    res.cookie('access_token', token, {
      httpOnly: true, // Le cookie est accessible uniquement par le serveur
      secure: process.env.NODE_ENV === 'production', // Utilise HTTPS uniquement en production
      sameSite: 'Strict' // Sécurise le cookie contre le vol via CSRF
    }).status(200).json(others); // Retourne les informations de l'utilisateur (sans le mot de passe)
  } catch (error) {
    next(error); // Passe l'erreur au middleware suivant si une erreur se produit
  }
};
