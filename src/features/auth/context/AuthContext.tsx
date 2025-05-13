import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, LoginCredentials, RegisterData } from '../../../services/auth/auth.service';
import { getUserFromToken, isTokenValid } from '../../../services/auth/token.service';

// Context type definition
interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isAuthenticated: false,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null,
});

// Hook for easy context usage
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state when the component mounts
  useEffect(() => {
    const initAuth = () => {
      if (isTokenValid()) {
        const userData = getUserFromToken();
        setUser(userData);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      setUser({
        id: response.user.id,
        email: response.user.email,
      });
      setIsAuthenticated(true);
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register(data);
      setUser({
        id: response.user.id,
        email: response.user.email,
      });
      setIsAuthenticated(true);
    } catch (err) {
      setError('Failed to register. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextType = {
    isLoading,
    isAuthenticated,
    user,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}; 