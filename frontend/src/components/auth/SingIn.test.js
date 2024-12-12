import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; // Assurez-vous que cette ligne est incluse
import SignIn from './SingIn';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('SignIn Component', () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    localStorage.clear();
  });

  it('should display success message on successful login', async () => {
    const mockToken = 'testToken';
    mock.onPost('http://localhost:5000/api/auth/login').reply(200, { token: mockToken });

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'correctpassword' } });

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(screen.getByText(/connexion réussie/i)).toBeInTheDocument();
    });

    expect(JSON.parse(localStorage.getItem('authToken'))).toBe(mockToken);
  });

  it('should display error message on failed login', async () => {
    mock.onPost('http://localhost:5000/api/auth/login').reply(401);

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(screen.getByText(/erreur lors de la connexion/i)).toBeInTheDocument();
    });
  });
});
