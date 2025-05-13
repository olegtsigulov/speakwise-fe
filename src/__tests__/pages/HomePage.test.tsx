import React from 'react';
import { render, screen } from '../test-utils';
import HomePage from '../../pages/HomePage';
import { useAuth } from '../../features/auth/context/AuthContext';
import { user } from '../test-utils';

// Mock the auth context
jest.mock('../../features/auth/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock implementation for useAuth
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 'user-123',
        email: 'test@example.com'
      },
      logout: jest.fn()
    });
  });
  
  it('should render welcome message with user email', () => {
    render(<HomePage />);
    
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });
  
  it('should call logout when logout button is clicked', async () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 'user-123',
        email: 'test@example.com'
      },
      logout: mockLogout
    });
    
    render(<HomePage />);
    
    // Find and click logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutButton);
    
    // Verify logout was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
}); 