import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as api from './path/to/your/api';

// Créez une instance de mock pour axios
const mock = new MockAdapter(axios);

describe('API Functions', () => {
  afterEach(() => {
    mock.reset(); // Réinitialiser le mock après chaque test
  });

  test('addFilm should add a new film', async () => {
    const filmData = { title: 'Inception', genre: 'Sci-Fi' };

    // Simuler la réponse de l'API
    mock.onPost('/movies').reply(200, { ...filmData, id: 1 });

    // Appeler la fonction addFilm
    const response = await api.addFilm(filmData);

    // Vérifier la réponse
    expect(response).toEqual({ ...filmData, id: 1 });
  });

  test('getFilms should retrieve a list of films', async () => {
    const films = [
      { id: 1, title: 'Inception', genre: 'Sci-Fi' },
      { id: 2, title: 'Titanic', genre: 'Drama' }
    ];

    // Simuler la réponse de l'API
    mock.onGet('/movies').reply(200, films);

    // Appeler la fonction getFilms
    const response = await api.getFilms();

    // Vérifier la réponse
    expect(response).toEqual(films);
  });

  test('getFilmById should retrieve a film by ID', async () => {
    const film = { id: 1, title: 'Inception', genre: 'Sci-Fi' };

    // Simuler la réponse de l'API
    mock.onGet('/movies/1').reply(200, film);

    // Appeler la fonction getFilmById
    const response = await api.getFilmById(1);

    // Vérifier la réponse
    expect(response).toEqual(film);
  });

  test('updateFilm should update a film', async () => {
    const updatedFilmData = { title: 'Inception', genre: 'Sci-Fi' };

    // Simuler la réponse de l'API
    mock.onPut('/movies/1').reply(200, updatedFilmData);

    // Appeler la fonction updateFilm
    const response = await api.updateFilm(1, updatedFilmData);

    // Vérifier la réponse
    expect(response).toEqual(updatedFilmData);
  });

  test('deleteFilm should delete a film', async () => {
    const deletedFilm = { id: 1, title: 'Inception', genre: 'Sci-Fi' };

    // Simuler la réponse de l'API
    mock.onDelete('/movies/1').reply(200, deletedFilm);

    // Appeler la fonction deleteFilm
    const response = await api.deleteFilm(1);

    // Vérifier la réponse
    expect(response).toEqual(deletedFilm);
  });

  test('registerUser should register a new user', async () => {
    const userData = { email: 'test@example.com', password: 'password123' };

    // Simuler la réponse de l'API
    mock.onPost('/auth/register').reply(200, { ...userData, id: 1 });

    // Appeler la fonction registerUser
    const response = await api.registerUser(userData);

    // Vérifier la réponse
    expect(response).toEqual({ ...userData, id: 1 });
  });

  test('loginUser should log in a user', async () => {
    const credentials = { email: 'test@example.com', password: 'password123' };

    // Simuler la réponse de l'API
    mock.onPost('/auth/login').reply(200, { token: 'testToken' });

    // Appeler la fonction loginUser
    const response = await api.loginUser(credentials);

    // Vérifier la réponse
    expect(response).toEqual({ token: 'testToken' });
  });

  test('getUserById should retrieve a user by ID', async () => {
    const user = { id: 1, email: 'test@example.com' };

    // Simuler la réponse de l'API
    mock.onGet('/users/1').reply(200, user);

    // Appeler la fonction getUserById
    const response = await api.getUserById(1);

    // Vérifier la réponse
    expect(response).toEqual(user);
  });

  test('updateUser should update a user', async () => {
    const updatedUserData = { email: 'newemail@example.com' };

    // Simuler la réponse de l'API
    mock.onPut('/users/1').reply(200, updatedUserData);

    // Appeler la fonction updateUser
    const response = await api.updateUser(1, updatedUserData);

    // Vérifier la réponse
    expect(response).toEqual(updatedUserData);
  });

  test('deleteUser should delete a user', async () => {
    const deletedUser = { id: 1, email: 'test@example.com' };

    // Simuler la réponse de l'API
    mock.onDelete('/users/1').reply(200, deletedUser);

    // Appeler la fonction deleteUser
    const response = await api.deleteUser(1);

    // Vérifier la réponse
    expect(response).toEqual(deletedUser);
  });
});
