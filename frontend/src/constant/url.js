import axios from 'axios';

const baseURL = import.meta.env.REACT_APP_BACKEND_URL;

const url = {
  movies: `${baseURL}/movies`,
  auth: `${baseURL}/auth`,
  users: `${baseURL}/users`,
};

const withId = (base, id) => `${base}/${id}`;

export const addFilm = async (filmData) => {
  try {
    const { data } = await axios.post(url.movies, filmData);
    console.log('Film added successfully:', data);
    return data;
  } catch (error) {
    console.error('Error adding film:', error);
    throw error;
  }
};

export const getFilms = async () => {
  try {
    const { data } = await axios.get(url.movies);
    console.log('Films retrieved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving films:', error);
    throw error;
  }
};

export const getFilmById = async (id) => {
  try {
    const { data } = await axios.get(withId(url.movies, id));
    console.log('Film retrieved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving film:', error);
    throw error;
  }
};

export const updateFilm = async (id, filmData) => {
  try {
    const { data } = await axios.put(withId(url.movies, id), filmData);
    console.log('Film updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating film:', error);
    throw error;
  }
};

export const deleteFilm = async (id) => {
  try {
    const { data } = await axios.delete(withId(url.movies, id));
    console.log('Film deleted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error deleting film:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(`${url.auth}/register`, userData);
    console.log('User registered successfully:', data);
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post(`${url.auth}/login`, credentials);
    console.log('User logged in successfully:', data);
    return data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const { data } = await axios.get(withId(url.users, id));
    console.log('User retrieved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const { data } = await axios.put(withId(url.users, id), userData);
    console.log('User updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(withId(url.users, id));
    console.log('User deleted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
