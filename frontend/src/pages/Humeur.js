// src/pages/Humeur.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo512.png';
import '../styles/Humeur.css';

const Humeur = ({ onBackButtonClick }) => {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [showButtons, setShowButtons] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [reactions, setReactions] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentMood, setCurrentMood] = useState('');
    const [loading, setLoading] = useState(false);
    const [watchProviders, setWatchProviders] = useState(null);

    const apiKey = '893fb1986c97f41a3868c76bf2cf6e34';

    const fetchMoviesByMood = async (mood) => {
        setLoading(true);

        let genreId = '';
        if (mood === 'Joyeux') {
            genreId = '35'; // Comédie
        } else if (mood === 'Triste') {
            genreId = '18'; // Drame
        } else if (mood === 'En colère') {
            genreId = '10749'; // Romance
        }

        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=fr-FR`);
            const data = await response.json();
            if (data.results) {
                const randomResults = data.results.sort(() => 0.5 - Math.random()).slice(0, 3);
                setResults(randomResults);
                setShowButtons(false);
            } else {
                console.error('Aucun film trouvé.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des films:', error);
        } finally {
            setLoading(false);
        }
    };

    const getMovieTrailer = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=fr-FR`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            return trailer ? trailer.key : null;
        } catch (error) {
            console.error('Erreur lors de la récupération de la bande-annonce:', error);
        }
    };

    const fetchWatchProviders = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setWatchProviders(data.results.FR);
        } catch (error) {
            console.error('Erreur lors de la récupération des plateformes de streaming:', error);
        }
    };

    const handleMoodSelect = (mood) => {
        setCurrentMood(mood);
        fetchMoviesByMood(mood);
    };

    const handleDurationSelect = (duration) => {
        let mood = '';
        if (duration === 1) {
            mood = 'Joyeux';
        } else if (duration === 2) {
            mood = 'Triste';
        } else if (duration === 3) {
            mood = 'En colère';
        }
        handleMoodSelect(mood);
        navigate('/');
    };

    const handleBackButtonClick = () => {
        onBackButtonClick();
        navigate('/');
    };

    const handleMovieClick = async (movie) => {
        const trailerKey = await getMovieTrailer(movie.id);
        if (trailerKey) {
            setSelectedTrailer(trailerKey);
        } else {
            alert("Désolé, aucune bande-annonce n'est disponible pour ce film.");
        }
        setSelectedMovie(movie);
        setComments([]);
        fetchWatchProviders(movie.id);
    };

    const handleBackToListClick = () => {
        setSelectedMovie(null);
        setSelectedTrailer(null);
        setWatchProviders(null);
    };

    const handleReaction = (movieId, reaction) => {
        setReactions(prevReactions => {
            const currentReaction = prevReactions[movieId]?.reaction;
            let likeCount = prevReactions[movieId]?.likeCount || 0;
            let dislikeCount = prevReactions[movieId]?.dislikeCount || 0;

            if (currentReaction === reaction) {
                if (reaction === 'like') likeCount--;
                else if (reaction === 'dislike') dislikeCount--;
                return {
                    ...prevReactions,
                    [movieId]: { reaction: null, likeCount, dislikeCount }
                };
            } else {
                if (reaction === 'like') {
                    likeCount++;
                    if (currentReaction === 'dislike') dislikeCount--;
                } else if (reaction === 'dislike') {
                    dislikeCount++;
                    if (currentReaction === 'like') likeCount--;
                }
                return {
                    ...prevReactions,
                    [movieId]: { reaction, likeCount, dislikeCount }
                };
            }
        });
    };

    const handleAddComment = () => {
        if (newComment.trim() === '') return;

        const newCommentObj = {
            id: comments.length + 1,
            text: newComment,
            replies: []
        };
        setComments([...comments, newCommentObj]);
        setNewComment('');
    };

    const handleReply = (commentId, replyText) => {
        setComments(prevComments => prevComments.map(comment =>
            comment.id === commentId
                ? { ...comment, replies: [...comment.replies, replyText] }
                : comment
        ));
    };

    const handleReloadMovies = () => {
        setLoading(true);

        setTimeout(() => {
            fetchMoviesByMood(currentMood);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="Humeur">
            <img src={logo} alt="Logo" onClick={() => navigate('/')} />
            <h1>{loading ? 'CHARGEMENT DE VOS FILMS...' : showButtons ? 'QUELLE EST VOTRE HUMEUR ?' : 'VOICI LE RÉSULTAT'}</h1>

            {loading && <div className="spinner"></div>}

            {!loading && showButtons && (
                <div>
                    <div className="mood-buttons">
                        <button onClick={() => handleDurationSelect(1)}>JOYEUX</button>
                        <button onClick={() => handleDurationSelect(2)}>TRISTE</button>
                        <button onClick={() => handleDurationSelect(3)}>EN COLÈRE</button>
                    </div>
                    <button className="back-button" onClick={handleBackButtonClick}>RECOMMENCER</button>
                </div>
            )}

            {!loading && selectedMovie ? (
                <div className="movie-details">
                    <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                    <h3>{selectedMovie.title}</h3>
                    <p>{selectedMovie.overview}</p>

                    {selectedTrailer && (
                        <div className="trailer">
                            <h3>Bande-annonce</h3>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${selectedTrailer}`}
                                title="Lecteur vidéo YouTube"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}

                    {watchProviders && watchProviders.flatrate && (
                        <div className="watch-providers">
                            <h4>Disponible sur :</h4>
                            <div className="provider-logos">
                                {watchProviders.flatrate.map(provider => (
                                    <a key={provider.provider_id} href={provider.link} target="_blank" rel="noopener noreferrer">
                                        <img src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`} alt={provider.provider_name} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className="back-button" onClick={handleBackToListClick}>RETOUR À LA LISTE</button>

                    <div className="like-dislike-buttons">
                        <span
                            className={`like-button ${reactions[selectedMovie.id]?.reaction === 'like' ? 'liked' : ''}`}
                            onClick={() => handleReaction(selectedMovie.id, 'like')}
                        >
                            ❤️ {reactions[selectedMovie.id]?.likeCount || 0}
                        </span>
                        <span
                            className={`dislike-button ${reactions[selectedMovie.id]?.reaction === 'dislike' ? 'disliked' : ''}`}
                            onClick={() => handleReaction(selectedMovie.id, 'dislike')}
                        >
                            💔 {reactions[selectedMovie.id]?.dislikeCount || 0}
                        </span>
                    </div>

                    <div className="comments-section">
                        <h4>Commentaires</h4>
                        <ul className="comments-list">
                            {comments.map(comment => (
                                <li key={comment.id}>
                                    <p>{comment.text}</p>
                                    <ul className="replies-list">
                                        {comment.replies.map((reply, index) => (
                                            <li key={index}>{reply}</li>
                                        ))}
                                    </ul>
                                    <input
                                        type="text"
                                        placeholder="Répondre..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleReply(comment.id, e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                        <textarea
                            placeholder="Ajouter un commentaire..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleAddComment}>Envoyer</button>
                    </div>
                </div>
            ) : (
                !loading && (
                    <div>
                        <ul className="movie-list">
                            {results.map(movie => (
                                <li key={movie.id} onClick={() => handleMovieClick(movie)}>
                                    <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                    <h3>{movie.title}</h3>
                                    <div className="like-dislike-buttons">
                                        <span
                                            className={`like-button ${reactions[movie.id]?.reaction === 'like' ? 'liked' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); handleReaction(movie.id, 'like'); }}
                                        >
                                            ❤️ {reactions[movie.id]?.likeCount || 0}
                                        </span>
                                        <span
                                            className={`dislike-button ${reactions[movie.id]?.reaction === 'dislike' ? 'disliked' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); handleReaction(movie.id, 'dislike'); }}
                                        >
                                            💔 {reactions[movie.id]?.dislikeCount || 0}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {!showButtons && !selectedMovie && (
                            <div>
                                <button className="back-button" onClick={handleBackButtonClick}>RECOMMENCER</button>
                                <button className="reload-button" onClick={handleReloadMovies} style={{ backgroundColor: 'red', marginLeft: '10px' }}>
                                    AUTRES FILMS
                                </button>
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default Humeur;
