import { jwtDecode } from 'jwt-decode';

// Storage keys
const TOKEN_KEY = 'auth_token';

/**
 * Interface for the decoded JWT token
 */
export interface DecodedToken {
  sub: string; // User ID
  email: string;
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
}

/**
 * Sets the authentication token in localStorage
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Gets the authentication token from localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Removes the authentication token from localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Checks if the current token is valid (exists and not expired)
 */
export const isTokenValid = (): boolean => {
  const token = getToken();
  
  if (!token) {
    return false;
  }
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // Check if token is expired
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

/**
 * Get user information from the decoded token
 */
export const getUserFromToken = (): { id: string; email: string } | null => {
  const token = getToken();
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return {
      id: decoded.sub,
      email: decoded.email
    };
  } catch (error) {
    return null;
  }
}; 