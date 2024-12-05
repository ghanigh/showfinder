import Mood from '../models/mood.js';

// Récupère toutes les humeurs
export const getAllMoods = async (req, res) => {
  try {
    const moods = await Mood.find(); // Recherche toutes les humeurs dans la base de données
    res.status(200).json(moods); // Retourne les humeurs trouvées
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des humeurs.' }); // Gère l'erreur en cas de problème
  }
};

// Récupère une humeur par ID
export const getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id); // Recherche une humeur par son ID
    if (!mood) {
      return res.status(404).json({ message: 'Humeur non trouvée.' }); // Si l'humeur n'existe pas, retourne une erreur 404
    }
    res.status(200).json(mood); // Retourne l'humeur trouvée
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' }); // Gère l'erreur en cas de problème
  }
};

// Crée une nouvelle humeur
export const createMood = async (req, res) => {
  const { moodId, moodName, genreId } = req.body; // Récupère les données envoyées dans la requête

  try {
    const newMood = new Mood({
      moodId, // ID de l'humeur
      moodName, // Nom de l'humeur
      genreId // ID du genre associé à l'humeur
    });

    await newMood.save(); // Sauvegarde la nouvelle humeur dans la base de données
    res.status(201).json(newMood); // Retourne l'humeur créée
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la création de l\'humeur.' }); // Gère l'erreur en cas de problème
  }
};

// Met à jour une humeur
export const updateMood = async (req, res) => {
  try {
    const updatedMood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Met à jour l'humeur par son ID
    if (!updatedMood) {
      return res.status(404).json({ message: 'Humeur non trouvée.' }); // Si l'humeur n'existe pas, retourne une erreur 404
    }
    res.status(200).json(updatedMood); // Retourne l'humeur mise à jour
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'humeur.' }); // Gère l'erreur en cas de problème
  }
};

// Supprime une humeur
export const deleteMood = async (req, res) => {
  try {
    const deletedMood = await Mood.findByIdAndDelete(req.params.id); // Supprime l'humeur par son ID
    if (!deletedMood) {
      return res.status(404).json({ message: 'Humeur non trouvée.' }); // Si l'humeur n'existe pas, retourne une erreur 404
    }
    res.status(204).send(); // 204 No Content, indiquant que la suppression a réussi
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'humeur.' }); // Gère l'erreur en cas de problème
  }
};
