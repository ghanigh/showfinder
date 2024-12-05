import Movie from '../models/movie.js';

// Récupérer tous les films
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des films.' });
  }
};

// Récupérer un film par ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Film non trouvé.' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Créer un nouveau film
export const createMovie = async (req, res) => {
  const { movieId, title, overview, genres, releaseDate, watchProviders } = req.body;

  try {
    const newMovie = new Movie({
      movieId,
      title,
      overview,
      genres,
      releaseDate,
      watchProviders
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la création du film.' });
  }
};

// Mettre à jour un film
export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Film non trouvé.' });
    }
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du film.' });
  }
};

// Supprimer un film
export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Film non trouvé.' });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du film.' });
  }
};
