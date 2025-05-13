import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';
import { useAuth } from '../../features/auth/context/AuthContext';

// Mock the auth context
jest.mock('../../features/auth/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('RegisterForm', () => {
  // Mock register function
  const registerMock = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock implementation
    (useAuth as jest.Mock).mockReturnValue({
      register: registerMock,
      isLoading: false,
      error: null,
    });
  });
  
  it('should render registration form correctly', () => {
    render(<RegisterForm />);
    
    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company domain/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });
  
  it('should validate required fields', async () => {
    render(<RegisterForm />);
    
    // Submit the form without entering any data
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    // Check for validation errors - use getAllByText for texts that might appear multiple times
    await waitFor(() => {
      // Find all elements with the validation error messages
      const nameErrorElements = screen.getAllByText(/name must be at least 2 characters/i);
      const emailErrorElement = screen.getByText(/email is required/i);
      const domainErrorElement = screen.getByText(/company domain must be at least 2 characters/i);
      const passwordErrorElement = screen.getByText(/password must be at least 6 characters/i);
      const confirmErrorElement = screen.getByText(/confirm password is required/i);
      
      // Check that at least one of each error exists
      expect(nameErrorElements.length).toBeGreaterThan(0);
      expect(emailErrorElement).toBeInTheDocument();
      expect(domainErrorElement).toBeInTheDocument();
      expect(passwordErrorElement).toBeInTheDocument();
      expect(confirmErrorElement).toBeInTheDocument();
    });
    
    // Register should not be called
    expect(registerMock).not.toHaveBeenCalled();
  });
  
  it('should validate email format', async () => {
    render(<RegisterForm />);
    
    // Enter all fields but with invalid email
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.type(screen.getByLabelText(/company name/i), 'Test Company');
    await userEvent.type(screen.getByLabelText(/company domain/i), 'example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
    
    // Register should not be called
    expect(registerMock).not.toHaveBeenCalled();
  });
  
  it('should validate company domain format', async () => {
    render(<RegisterForm />);
    
    // Enter all fields but with invalid domain
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/company name/i), 'Test Company');
    await userEvent.type(screen.getByLabelText(/company domain/i), 'invalid-domain');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/enter a valid domain/i)).toBeInTheDocument();
    });
    
    // Register should not be called
    expect(registerMock).not.toHaveBeenCalled();
  });
  
  it('should validate passwords match', async () => {
    render(<RegisterForm />);
    
    // Enter all fields but with non-matching passwords
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/company name/i), 'Test Company');
    await userEvent.type(screen.getByLabelText(/company domain/i), 'example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'different-password');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
    
    // Register should not be called
    expect(registerMock).not.toHaveBeenCalled();
  });
  
  it('should submit valid form data', async () => {
    render(<RegisterForm />);
    
    // Enter valid data
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/company name/i), 'Test Company');
    await userEvent.type(screen.getByLabelText(/company domain/i), 'example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    // Check that register was called with correct data (without confirmPassword)
    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        companyName: 'Test Company',
        companyDomain: 'example.com',
        password: 'password123',
      });
    });
  });
  
  it('should show loading state during submission', async () => {
    render(<RegisterForm />);
    
    // Enter valid data
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/company name/i), 'Test Company');
    await userEvent.type(screen.getByLabelText(/company domain/i), 'example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    
    // Simulate form submission (register not resolved yet)
    const button = screen.getByRole('button', { name: /create account/i });
    registerMock.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    await userEvent.click(button);
    
    // Button should show loading state
    expect(button.textContent).toBe('Creating Account...');
    expect(button).toBeDisabled();
    
    // Wait for register to resolve
    await waitFor(() => {
      expect(registerMock).toHaveBeenCalled();
    });
  });
  
  it('should display error message on registration failure', async () => {
    // Mock register to throw an error
    const mockError = new Error('Registration failed');
    registerMock.mockRejectedValue(mockError);
    
    render(<RegisterForm />);
    
    // Enter valid data
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/company name/i), 'Test Company');
    await userEvent.type(screen.getByLabelText(/company domain/i), 'example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));
    
    // Check that error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });
}); 