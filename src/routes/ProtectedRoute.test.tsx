import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../features/auth/context/AuthContext';

// Mock the auth context
jest.mock('../features/auth/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock components for testing
const TestProtectedComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

describe('ProtectedRoute', () => {
  const renderProtectedRoute = () => {
    return render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/protected" element={<ProtectedRoute />}>
            <Route index element={<TestProtectedComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading spinner while authentication is being checked', () => {
    // Mock authentication is loading
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    renderProtectedRoute();

    // Should not redirect yet and should show a loading state
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render child routes when user is authenticated', () => {
    // Mock authenticated user
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    renderProtectedRoute();

    // Should render the protected content
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    // Mock unauthenticated user
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    renderProtectedRoute();

    // Should redirect to login page
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to custom path when specified', () => {
    // Setup custom redirect path
    const CustomLoginComponent = () => <div>Custom Login Path</div>;

    // Mock unauthenticated user
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/custom-login" element={<CustomLoginComponent />} />
          <Route
            path="/protected"
            element={<ProtectedRoute redirectPath="/custom-login" />}
          >
            <Route index element={<TestProtectedComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Should redirect to custom login page
    expect(screen.getByText('Custom Login Path')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
}); 