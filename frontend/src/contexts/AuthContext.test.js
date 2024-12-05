import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext'; // Assurez-vous du bon chemin d'importation
import React from 'react';

// Composant de test pour consommer le contexte
const TestComponent = () => {
    const { isAuthenticated, login, logout } = useAuth();

    return (
        <div>
            <p data-testid="auth-status">{isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('AuthContext', () => {
    it('should initially set isAuthenticated to false', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const authStatus = screen.getByTestId('auth-status');
        expect(authStatus.textContent).toBe('Logged Out');
    });

    it('should update isAuthenticated to true when login is called', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

        const authStatus = screen.getByTestId('auth-status');
        expect(authStatus.textContent).toBe('Logged In');
    });

    it('should update isAuthenticated to false when logout is called', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Effectue d'abord un login
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        const authStatus = screen.getByTestId('auth-status');
        expect(authStatus.textContent).toBe('Logged Out');
    });
});
