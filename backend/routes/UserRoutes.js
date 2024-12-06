// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

// Route pour récupérer un profil
router.get('/:email', async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ email: req.params.email });
    if (!userProfile) return res.status(404).send('Profil introuvable.');
    res.json(userProfile);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// Route pour mettre à jour un profil
router.put('/:email', async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updatedProfile) return res.status(404).send('Profil introuvable.');
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// Route pour créer un profil
router.post('/', async (req, res) => {
  try {
    const newProfile = new UserProfile(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
