import mongoose from 'mongoose';

const recommendationSchema = mongoose.Schema({
  recommendationId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle User
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie', // Référence au modèle Movie
    required: true
  },
  moodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mood', // Référence au modèle Mood
    required: true
  }
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;
