import Reaction from '../models/reaction.js';

// Récupérer toutes les réactions
export const getAllReactions = async (req, res) => {
  try {
    const reactions = await Reaction.find()
      .populate('userId') // Récupérer les détails de l'utilisateur
      .populate('movieId'); // Récupérer les détails du film
    res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des réactions.' });
  }
};

// Récupérer une réaction par ID
export const getReactionById = async (req, res) => {
  try {
    const reaction = await Reaction.findById(req.params.id)
      .populate('userId')
      .populate('movieId');
    if (!reaction) {
      return res.status(404).json({ message: 'Réaction non trouvée.' });
    }
    res.status(200).json(reaction);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Créer une nouvelle réaction
export const createReaction = async (req, res) => {
  const { userId, movieId, reactionType } = req.body;

  try {
    const newReaction = new Reaction({
      userId,
      movieId,
      reactionType
    });

    await newReaction.save();
    res.status(201).json(newReaction);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la création de la réaction.' });
  }
};

// Mettre à jour une réaction
export const updateReaction = async (req, res) => {
  try {
    const updatedReaction = await Reaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReaction) {
      return res.status(404).json({ message: 'Réaction non trouvée.' });
    }
    res.status(200).json(updatedReaction);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la réaction.' });
  }
};

// Supprimer une réaction
export const deleteReaction = async (req, res) => {
  try {
    const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
    if (!deletedReaction) {
      return res.status(404).json({ message: 'Réaction non trouvée.' });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la réaction.' });
  }
};
