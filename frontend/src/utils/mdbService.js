export const getMovieTrailer = async (movieId) => {
    const apiKey = '93fb1986c97f41a3868c76bf2cf6e34';
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        // Trouver la première vidéo de type 'Trailer'
        const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        return trailer ? trailer.key : null;
    } catch (error) {
        console.error('Erreur lors de la récupération de la bande-annonce:', error);
    }
};
