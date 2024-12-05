import axios from 'axios';
import * as api from './url';

jest.mock('axios'); // Moque axios

describe('API Functions', () => {
  it('should add a film', async () => {
    const filmData = { title: 'Inception', director: 'Christopher Nolan' };
    axios.post.mockResolvedValue({ data: filmData });

    const result = await api.addFilm(filmData);
    
    expect(result).toEqual(filmData); 
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/movies', filmData); 
  });

  it('should retrieve films', async () => {
    const films = [
      { id: '1', title: 'Inception', director: 'Christopher Nolan' },
      { id: '2', title: 'The Dark Knight', director: 'Christopher Nolan' },
    ];
    axios.get.mockResolvedValue({ data: films });

    const result = await api.getFilms();
    
    expect(result).toEqual(films);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/movies');
  });

  it('should retrieve a film by ID', async () => {
    const film = { id: '1', title: 'Inception', director: 'Christopher Nolan' };
    axios.get.mockResolvedValue({ data: film });

    const result = await api.getFilmById('1');
    
    expect(result).toEqual(film);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/movies/1');
  });

  it('should update a film', async () => {
    const updatedFilm = { id: '1', title: 'Inception', director: 'Christopher Nolan', year: 2010 };
    axios.put.mockResolvedValue({ data: updatedFilm });

    const result = await api.updateFilm('1', updatedFilm);
    
    expect(result).toEqual(updatedFilm);
    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/api/movies/1', updatedFilm);
  });

  it('should delete a film', async () => {
    axios.delete.mockResolvedValue({ data: { message: 'Film deleted successfully' } });

    const result = await api.deleteFilm('1');
    
    expect(result).toEqual({ message: 'Film deleted successfully' });
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/api/movies/1');
  });

  it('should register a user', async () => {
    const userData = { username: 'john_doe', email: 'john@example.com' };
    axios.post.mockResolvedValue({ data: userData });

    const result = await api.registerUser(userData);
    
    expect(result).toEqual(userData);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/auth/register', userData);
  });

  it('should login a user', async () => {
    const credentials = { email: 'john@example.com', password: 'password123' };
    const loginResponse = { token: 'abcd1234' };
    axios.post.mockResolvedValue({ data: loginResponse });

    const result = await api.loginUser(credentials);
    
    expect(result).toEqual(loginResponse);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', credentials);
  });

  it('should retrieve a user by ID', async () => {
    const user = { id: '1', username: 'john_doe', email: 'john@example.com' };
    axios.get.mockResolvedValue({ data: user });

    const result = await api.getUserById('1');
    
    expect(result).toEqual(user);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/users/1');
  });

  it('should update a user', async () => {
    const updatedUser = { id: '1', username: 'john_doe', email: 'john_new@example.com' };
    axios.put.mockResolvedValue({ data: updatedUser });

    const result = await api.updateUser('1', updatedUser);
    
    expect(result).toEqual(updatedUser);
    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/api/users/1', updatedUser);
  });

  it('should delete a user', async () => {
    axios.delete.mockResolvedValue({ data: { message: 'User deleted successfully' } });

    const result = await api.deleteUser('1');
    
    expect(result).toEqual({ message: 'User deleted successfully' });
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/api/users/1');
  });

  it('should handle errors gracefully', async () => {
    axios.post.mockRejectedValue(new Error('Error adding film'));

    try {
      await api.addFilm({ title: 'Inception', director: 'Christopher Nolan' });
    } catch (error) {
      expect(error.message).toBe('Error adding film');
    }
  });
});
