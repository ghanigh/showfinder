const apiKey = '893fb1986c97f41a3868c76bf2cf6e34';

export const fetchMoviesByMood = (mood) => {
    let genreId = '';
    if (mood === 'Joyeux') {
        genreId = '35'; // Comédie
    } else if (mood === 'Triste') {
        genreId = '18'; // Drame
    } else if (mood === 'En colère') {
        genreId = '10749'; // Romance
    }

    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=fr-FR`)
        .then(response => response.json())
        .then(data => {
            const randomResults = data.results.sort(() => 0.5 - Math.random()).slice(0, 3);
            return randomResults;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des films:', error);
            return [];
        });
};
