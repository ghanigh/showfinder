import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from './SingIn';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous d'importer axios
import '@testing-library/jest-dom';

jest.mock('axios'); // Moque axios pour que vous puissiez contrôler ses comportements

describe('SignIn Component', () => {
  it('renders the SignIn form correctly', () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByText(/se connecter/i)).toBeInTheDocument();
  });

  it('displays a success message and redirects upon successful login', async () => {
    // Simule la réponse de l'API
    axios.post.mockResolvedValue({
      data: { token: 'fake_token' },
    });

    render(
      <Router>
        <SignIn />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/se connecter/i));

    // Attendre la redirection ou la réponse de l'API
    await waitFor(() => screen.getByText(/connexion réussie/i));

    expect(localStorage.getItem('authToken')).toBeDefined(); // Vérifie que le token est bien stocké
    expect(screen.getByText(/connexion réussie/i)).toBeInTheDocument(); // Vérifie le message de succès
  });

  it('displays an error message if login fails', async () => {
    // Simule un échec de connexion
    axios.post.mockRejectedValue(new Error('Erreur lors de la connexion'));

    render(
      <Router>
        <SignIn />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText(/se connecter/i));

    // Attendre le message d'erreur
    await waitFor(() => screen.getByText(/erreur lors de la connexion/i));

    expect(screen.getByText(/erreur lors de la connexion/i)).toBeInTheDocument(); // Vérifie le message d'erreur
  });
});
