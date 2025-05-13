import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

// Mock router
jest.mock('react-router-dom');

// Mock AuthProvider
jest.mock('./features/auth/context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>
}));

// Mock AppRouter
jest.mock('./routes/AppRouter', () => ({
  __esModule: true,
  default: () => <div data-testid="app-router">App Router Mock</div>
}));

test('renders app with auth provider and router', () => {
  render(<App />);
  
  expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
  expect(screen.getByTestId('app-router')).toBeInTheDocument();
});
