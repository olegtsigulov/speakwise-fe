import { apiService } from '../api/api.service';
import { setToken, removeToken } from './token.service';

// Types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyDomain: string;
  password: string;
}

// Frontend type with password confirmation
export interface RegisterFormData extends RegisterData {
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    companyName: string;
    companyDomain: string;
  };
}

/**
 * Service for authentication operations
 */
export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },
  
  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/sign-up', userData);
    
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },
  
  /**
   * Logout the current user
   */
  logout(): void {
    removeToken();
  }
}; 