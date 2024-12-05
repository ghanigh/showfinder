import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Synopsis = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const apiKey = '893fb1986c97f41a3868c76bf2cf6e34';

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                setMovie(data);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Synopsis">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <button onClick={() => window.history.back()}>Retour</button>
        </div>
    );
};

export default Synopsis;
