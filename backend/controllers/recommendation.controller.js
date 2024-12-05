import Recommendation from '../models/recommendation.js';

// Récupérer toutes les recommandations
export const getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find()
      .populate('userId') // Récupérer les détails de l'utilisateur
      .populate('movieId') // Récupérer les détails du film
      .populate('moodId'); // Récupérer les détails de l'humeur
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des recommandations.' });
  }
};

// Récupérer une recommandation par ID
export const getRecommendationById = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id)
      .populate('userId')
      .populate('movieId')
      .populate('moodId');
    if (!recommendation) {
      return res.status(404).json({ message: 'Recommandation non trouvée.' });
    }
    res.status(200).json(recommendation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Créer une nouvelle recommandation
export const createRecommendation = async (req, res) => {
  const { userId, movieId, moodId } = req.body;

  try {
    const newRecommendation = new Recommendation({
      userId,
      movieId,
      moodId
    });

    await newRecommendation.save();
    res.status(201).json(newRecommendation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la création de la recommandation.' });
  }
};

// Mettre à jour une recommandation
export const updateRecommendation = async (req, res) => {
  try {
    const updatedRecommendation = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecommendation) {
      return res.status(404).json({ message: 'Recommandation non trouvée.' });
    }
    res.status(200).json(updatedRecommendation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la recommandation.' });
  }
};

// Supprimer une recommandation
export const deleteRecommendation = async (req, res) => {
  try {
    const deletedRecommendation = await Recommendation.findByIdAndDelete(req.params.id);
    if (!deletedRecommendation) {
      return res.status(404).json({ message: 'Recommandation non trouvée.' });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la recommandation.' });
  }
};
