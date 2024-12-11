import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import {
  addFilm,
  getFilms,
  getFilmById,
  updateFilm,
  deleteFilm,
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../../api/url';  // Assurez-vous que le chemin vers 'url.js' est correct

const mock = new axiosMockAdapter(axios);

describe('API Calls', () => {
  beforeEach(() => {
    mock.reset(); // Reset the mock for each test
  });

  test('addFilm should add a new film', async () => {
    const filmData = { title: 'Test Film', year: 2024 };
    mock.onPost('/movies').reply(200, filmData);

    const result = await addFilm(filmData);

    expect(result).toEqual(filmData);
    expect(mock.history.post.length).toBe(1); // Vérifier qu'une requête POST a été effectuée
  });

  test('getFilms should return a list of films', async () => {
    const films = [
      { title: 'Film 1', year: 2020 },
      { title: 'Film 2', year: 2021 },
    ];
    mock.onGet('/movies').reply(200, films);

    const result = await getFilms();

    expect(result).toEqual(films);
    expect(mock.history.get.length).toBe(1); // Vérifier qu'une requête GET a été effectuée
  });

  test('getFilmById should return a specific film', async () => {
    const film = { title: 'Test Film', year: 2024 };
    mock.onGet('/movies/1').reply(200, film);

    const result = await getFilmById(1);

    expect(result).toEqual(film);
    expect(mock.history.get.length).toBe(1); // Vérifier qu'une requête GET a été effectuée
  });

  test('updateFilm should update a specific film', async () => {
    const filmData = { title: 'Updated Film', year: 2024 };
    mock.onPut('/movies/1').reply(200, filmData);

    const result = await updateFilm(1, filmData);

    expect(result).toEqual(filmData);
    expect(mock.history.put.length).toBe(1); // Vérifier qu'une requête PUT a été effectuée
  });

  test('deleteFilm should delete a specific film', async () => {
    mock.onDelete('/movies/1').reply(200, { message: 'Film deleted' });

    const result = await deleteFilm(1);

    expect(result.message).toBe('Film deleted');
    expect(mock.history.delete.length).toBe(1); // Vérifier qu'une requête DELETE a été effectuée
  });

  test('registerUser should register a new user', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    mock.onPost('/auth/register').reply(200, userData);

    const result = await registerUser(userData);

    expect(result).toEqual(userData);
    expect(mock.history.post.length).toBe(1); // Vérifier qu'une requête POST a été effectuée
  });

  test('loginUser should login a user', async () => {
    const credentials = { email: 'test@example.com', password: 'password' };
    mock.onPost('/auth/login').reply(200, { token: 'testToken' });

    const result = await loginUser(credentials);

    expect(result.token).toBe('testToken');
    expect(mock.history.post.length).toBe(1); // Vérifier qu'une requête POST a été effectuée
  });

  test('getUserById should return a specific user', async () => {
    const user = { email: 'test@example.com', role: 'user' };
    mock.onGet('/users/1').reply(200, user);

    const result = await getUserById(1);

    expect(result).toEqual(user);
    expect(mock.history.get.length).toBe(1); // Vérifier qu'une requête GET a été effectuée
  });

  test('updateUser should update a specific user', async () => {
    const userData = { email: 'updated@example.com' };
    mock.onPut('/users/1').reply(200, userData);

    const result = await updateUser(1, userData);

    expect(result).toEqual(userData);
    expect(mock.history.put.length).toBe(1); // Vérifier qu'une requête PUT a été effectuée
  });

  test('deleteUser should delete a specific user', async () => {
    mock.onDelete('/users/1').reply(200, { message: 'User deleted' });

    const result = await deleteUser(1);

    expect(result.message).toBe('User deleted');
    expect(mock.history.delete.length).toBe(1); // Vérifier qu'une requête DELETE a été effectuée
  });
});
