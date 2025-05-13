import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './AuthContext';
import { authService } from '../../../services/auth/auth.service';
import { isTokenValid, getUserFromToken } from '../../../services/auth/token.service';

// Mock services
jest.mock('../../../services/auth/auth.service', () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  },
}));

jest.mock('../../../services/auth/token.service', () => ({
  isTokenValid: jest.fn(),
  getUserFromToken: jest.fn(),
}));

// Test component that consumes auth context
const TestAuthConsumer: React.FC = () => {
  const { isAuthenticated, user, login, register, logout, error, isLoading } = useAuth();
  
  return (
    <div>
      <div data-testid="loading-state">{isLoading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="auth-state">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <div data-testid="user-email">{user?.email || 'No User'}</div>
      <div data-testid="error-message">{error || 'No Error'}</div>
      <button 
        data-testid="login-button" 
        onClick={() => login({ email: 'test@example.com', password: 'password123' })}
      >
        Login
      </button>
      <button 
        data-testid="register-button" 
        onClick={() => register({ 
          name: 'Test User', 
          email: 'test@example.com', 
          password: 'password123',
          companyName: 'Test Company',
          companyDomain: 'testcompany.com'
        })}
      >
        Register
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should start with loading and then change to not loading', async () => {
    // Mock isTokenValid to return false
    (isTokenValid as jest.Mock).mockReturnValue(false);
    
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );
    
    // After initialization completes, it should no longer be loading
    await waitFor(() => {
      expect(screen.getByTestId('loading-state').textContent).toBe('Not Loading');
    });
  });
  
  it('should initialize as authenticated when valid token exists', async () => {
    // Mock valid token and user data
    (isTokenValid as jest.Mock).mockReturnValue(true);
    (getUserFromToken as jest.Mock).mockReturnValue({
      id: 'user-123',
      email: 'test@example.com',
    });
    
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-state').textContent).toBe('Authenticated');
      expect(screen.getByTestId('user-email').textContent).toBe('test@example.com');
    });
  });
  
  it('should initialize as not authenticated when token is invalid', async () => {
    // Mock invalid token
    (isTokenValid as jest.Mock).mockReturnValue(false);
    
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-state').textContent).toBe('Not Authenticated');
      expect(screen.getByTestId('user-email').textContent).toBe('No User');
    });
  });
  
  it('should handle login successfully', async () => {
    // Mock successful login
    (authService.login as jest.Mock).mockResolvedValue({
      token: 'test-token',
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      },
    });
    
    // Mock invalid token for initial state
    (isTokenValid as jest.Mock).mockReturnValue(false);
    
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );
    
    // Wait for initial render to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading-state').textContent).toBe('Not Loading');
    });
    
    // Trigger login
    await userEvent.click(screen.getByTestId('login-button'));
    
    // Verify login was called with correct credentials
    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    
    // After login, user should be authenticated
    await waitFor(() => {
      expect(screen.getByTestId('auth-state').textContent).toBe('Authenticated');
      expect(screen.getByTestId('user-email').textContent).toBe('test@example.com');
    });
  });
  
  it('should handle login failure', async () => {
    // Mock login error message
    (authService.login as jest.Mock).mockRejectedValue({ message: 'Login failed' });
    
    // Mock invalid token for initial state
    (isTokenValid as jest.Mock).mockReturnValue(false);
    
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );
    
    // Wait for initial render to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading-state').textContent).toBe('Not Loading');
    });
    
    // Trigger login
    await userEvent.click(screen.getByTestId('login-button'));
    
    // After failed login, error message should be set
    await waitFor(() => {
      expect(screen.getByTestId('error-message').textContent).toBe('Failed to login. Please check your credentials.');
      // User should still be unauthenticated
      expect(screen.getByTestId('auth-state').textContent).toBe('Not Authenticated');
    });
  });
  
  it('should handle register successfully', async () => {
    // Mock successful registration
    (authService.register as jest.Mock).mockResolvedValue({
      token: 'test-token',
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        companyName: 'Test Company',
        companyDomain: 'testcompany.com',
      },
    });
    
    // Mock invalid token for initial state
    (isTokenValid as jest.Mock).mockReturnValue(false);
    
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );
    
    // Wait for initial render to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading-state').textContent).toBe('Not Loading');
    });
    
    // Trigger registration
    await userEvent.click(screen.getByTestId('register-button'));
    
    // Verify register was called with correct data
    expect(authService.register).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      companyName: 'Test Company',
      companyDomain: 'testcompany.com',
    });
    
    // After registration, user should be authenticated
    await waitFor(() => {
      expect(screen.getByTestId('auth-state').textContent).toBe('Authenticated');
      expect(screen.getByTestId('user-email').textContent).toBe('test@example.com');
    });
  });
  
  it('should handle logout', async () => {
    // Mock valid token for initial state
    (isTokenValid as jest.Mock).mockReturnValue(true);
    (getUserFromToken as jest.Mock).mockReturnValue({
      id: 'user-123',
      email: 'test@example.com',
    });
    
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );
    
    // Wait for initial authenticated state
    await waitFor(() => {
      expect(screen.getByTestId('auth-state').textContent).toBe('Authenticated');
    });
    
    // Trigger logout
    await userEvent.click(screen.getByTestId('logout-button'));
    
    // Verify logout was called
    expect(authService.logout).toHaveBeenCalled();
    
    // After logout, user should be unauthenticated
    expect(screen.getByTestId('auth-state').textContent).toBe('Not Authenticated');
    expect(screen.getByTestId('user-email').textContent).toBe('No User');
  });
}); 