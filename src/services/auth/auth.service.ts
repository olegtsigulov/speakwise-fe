import { apiService } from '../api/api.service';
import { setToken, removeToken } from './token.service';

// Types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  companyName: string;
  companyDomain: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
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
    const response = await apiService.post<AuthResponse>('/auth/register', userData);
    
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