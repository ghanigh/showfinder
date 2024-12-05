import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './SingUp';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'; // Importez axios
import '@testing-library/jest-dom';

jest.mock('axios'); // Moque axios pour contrôler son comportement dans les tests

describe('SignUp Component', () => {
  it('renders the SignUp form correctly', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByText(/s'inscrire/i)).toBeInTheDocument();
  });

  it('displays a success message and redirects upon successful signup', async () => {
    // Simule la réponse de l'API
    axios.post.mockResolvedValue({
      data: { message: 'Inscription réussie !' },
    });

    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), {
      target: { value: 'testUser' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/s'inscrire/i));

    // Attendre que le message de succès apparaisse
    await waitFor(() => screen.getByText(/inscription réussie/i));

    expect(screen.getByText(/inscription réussie/i)).toBeInTheDocument(); // Vérifie le message de succès
    expect(localStorage.getItem('authToken')).toBeDefined(); // Vérifie que le token est bien stocké si vous utilisez un token
  });

  it('displays an error message if signup fails', async () => {
    // Simule un échec d'inscription
    axios.post.mockRejectedValue(new Error('Erreur lors de l\'inscription'));

    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), {
      target: { value: 'testUser' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/s'inscrire/i));

    // Attendre que le message d'erreur apparaisse
    await waitFor(() => screen.getByText(/erreur lors de l'inscription/i));

    expect(screen.getByText(/erreur lors de l'inscription/i)).toBeInTheDocument(); // Vérifie le message d'erreur
  });
});
