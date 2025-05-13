import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { useAuth } from '../../features/auth/context/AuthContext';

// Mock the auth context
jest.mock('../../features/auth/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('LoginForm', () => {
  // Mock login function
  const loginMock = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock implementation
    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
      isLoading: false,
      error: null,
    });
  });
  
  it('should render login form correctly', () => {
    render(<LoginForm />);
    
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
  
  it('should validate required fields', async () => {
    render(<LoginForm />);
    
    // Submit the form without entering any data
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
    
    // Login should not be called
    expect(loginMock).not.toHaveBeenCalled();
  });
  
  it('should validate email format', async () => {
    render(<LoginForm />);
    
    // Enter invalid email
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
    
    // Login should not be called
    expect(loginMock).not.toHaveBeenCalled();
  });
  
  it('should validate password length', async () => {
    render(<LoginForm />);
    
    // Enter valid email but short password
    await userEvent.type(screen.getByLabelText(/email/i), 'valid@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), '12345');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
    
    // Login should not be called
    expect(loginMock).not.toHaveBeenCalled();
  });
  
  it('should submit valid form data', async () => {
    render(<LoginForm />);
    
    // Enter valid data
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check that login was called with correct data
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
  
  it('should show loading state during submission', async () => {
    render(<LoginForm />);
    
    // Enter valid data
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    
    // Simulate form submission (login not resolved yet)
    const button = screen.getByRole('button', { name: /sign in/i });
    loginMock.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    await userEvent.click(button);
    
    // Button should show loading state
    expect(button.textContent).toBe('Signing in...');
    expect(button).toBeDisabled();
    
    // Wait for login to resolve
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
    });
  });
  
  it('should display error message on login failure', async () => {
    // Mock login to throw an error
    const mockError = new Error('Authentication failed');
    loginMock.mockRejectedValue(mockError);
    
    render(<LoginForm />);
    
    // Enter valid data
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check that error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Authentication failed')).toBeInTheDocument();
    });
  });
}); 