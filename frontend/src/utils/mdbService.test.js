import { getMovieTrailer } from './mdbService';

describe('getMovieTrailer', () => {
    const mockApiResponse = {
        results: [
            { id: 1, key: 'abcd1234', type: 'Trailer', site: 'YouTube' },
            { id: 2, key: 'efgh5678', type: 'Teaser', site: 'YouTube' },
        ],
    };

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

    it('devrait retourner la clé de la bande-annonce pour un film donné', async () => {
        const trailerKey = await getMovieTrailer(123);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/movie/123/videos?') // Vérifie que l'URL contient l'ID du film
        );
        expect(trailerKey).toEqual('abcd1234'); // La clé correspond à celle du mock
    });

    it("devrait retourner null si aucune bande-annonce n'est disponible", async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        results: [
                            { id: 1, key: 'efgh5678', type: 'Teaser', site: 'YouTube' },
                        ],
                    }),
            })
        );

        const trailerKey = await getMovieTrailer(456);
        expect(trailerKey).toBeNull(); // Pas de bande-annonce dans le résultat
    });

    it('devrait gérer une erreur lors de la récupération de la bande-annonce', async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject('API Error'));

        const trailerKey = await getMovieTrailer(789);
        expect(trailerKey).toBeUndefined(); // Pas de retour attendu en cas d'erreur
        expect(console.error).toHaveBeenCalledWith(
            'Erreur lors de la récupération de la bande-annonce:',
            'API Error'
        );
    });
});
