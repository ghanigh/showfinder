import { fetchMoviesByMood } from './api';

describe('fetchMoviesByMood', () => {
    const mockApiResponse = {
        results: [
            { id: 1, title: 'Film 1', genre_ids: [35] },
            { id: 2, title: 'Film 2', genre_ids: [35] },
            { id: 3, title: 'Film 3', genre_ids: [35] },
            { id: 4, title: 'Film 4', genre_ids: [35] },
        ],
    };

    // Mock de fetch
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockApiResponse),
            })
        );

        // Mock de console.error
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('devrait retourner des films pour le mood "Joyeux"', async () => {
        const movies = await fetchMoviesByMood('Joyeux');
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('with_genres=35') // Vérifie que le genre comédie est utilisé
        );
        expect(movies).toHaveLength(3); // On limite à 3 films
        expect(movies[0]).toHaveProperty('title'); // Vérifie que les films ont un titre
    });

    it('devrait retourner des films pour le mood "Triste"', async () => {
        const movies = await fetchMoviesByMood('Triste');
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('with_genres=18') // Vérifie que le genre drame est utilisé
        );
        expect(movies).toHaveLength(3);
    });

    it('devrait retourner des films pour le mood "En colère"', async () => {
        const movies = await fetchMoviesByMood('En colère');
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('with_genres=10749') // Vérifie que le genre romance est utilisé
        );
        expect(movies).toHaveLength(3);
    });

    it('devrait gérer une erreur lors de la récupération des films', async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject('API Error'));

        const movies = await fetchMoviesByMood('Joyeux');
        expect(movies).toEqual([]); // Retourne un tableau vide en cas d'erreur
        expect(console.error).toHaveBeenCalledWith(
            'Erreur lors de la récupération des films:',
            'API Error'
        );
    });
});
