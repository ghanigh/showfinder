import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { ENV } from '../config/env.js';

dotenv.config();

// Fonction pour enregistrer un utilisateur
const register = async (req, res) => {
  const { username, email, password, role } = req.body; // Récupère les données du corps de la requête

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' }); // Vérifie les champs requis
  }

  try {
    console.log('Starting user registration process');

    const hashedPassword = await bcrypt.hash(password, 10); // Hachage du mot de passe
    console.log('Password hashed');

    const existingUser = await User.findOne({ email }); // Vérifie si l'utilisateur existe déjà
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword,
      role: role || 'user' // Attribue le rôle 'user' par défaut si non spécifié
    });

    await newUser.save(); // Sauvegarde l'utilisateur dans la base de données
    console.log('User saved to database');

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, ENV.TOKEN, {
      expiresIn: '1h', // Expiration du token en 1 heure
    });
    console.log('JWT token generated');

    res.status(201).json({ token }); // Retourne le token au client
  } catch (error) {
    console.error("Error during registration: ", error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error }); // Gère les erreurs
  }
};

// Fonction pour connecter un utilisateur
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // Cherche l'utilisateur par email
    if (!user) return res.status(404).json("User not found!");

    const comparePassword = await bcrypt.compare(req.body.password, user.password); // Compare les mots de passe
    if (!comparePassword) return res.status(400).json("Wrong Credentials!");

    const token = jwt.sign(
      { id: user._id, role: user.role }, // Ajoute le rôle dans le token
      ENV.TOKEN,
      { expiresIn: "24h" } // Expiration du token en 24 heures
    );

    const { password, ...others } = user._doc; // Exclut le mot de passe des données retournées

    res.cookie('access_token', token, { httpOnly: true }) // Ajoute un cookie sécurisé
       .status(200)
       .json(others); // Retourne les informations utilisateur
  } catch (error) {
    next(error); // Passe l'erreur au middleware suivant
  }
};

export { register, login }; // Exporte les fonctions
