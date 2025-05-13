import { setToken, getToken, removeToken, isTokenValid, getUserFromToken } from './token.service';
import { jwtDecode } from 'jwt-decode';

// Mock jwt-decode library
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('Token Service', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    // Reset jest mocks
    jest.clearAllMocks();
  });

  describe('setToken', () => {
    it('should store token in localStorage', () => {
      const token = 'test-jwt-token';
      setToken(token);
      expect(localStorage.getItem('auth_token')).toBe(token);
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      const token = 'test-jwt-token';
      localStorage.setItem('auth_token', token);
      
      expect(getToken()).toBe(token);
    });

    it('should return null if no token exists', () => {
      expect(getToken()).toBeNull();
    });
  });

  describe('removeToken', () => {
    it('should remove token from localStorage', () => {
      const token = 'test-jwt-token';
      localStorage.setItem('auth_token', token);
      
      removeToken();
      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });

  describe('isTokenValid', () => {
    it('should return false if no token exists', () => {
      expect(isTokenValid()).toBe(false);
    });

    it('should return true for valid non-expired token', () => {
      const token = 'valid-token';
      const futureTime = Date.now() + 3600000; // 1 hour in future
      
      localStorage.setItem('auth_token', token);
      
      // Mock jwt-decode to return non-expired token
      (jwtDecode as jest.Mock).mockReturnValue({
        exp: futureTime / 1000,
        sub: '123',
        email: 'test@example.com',
      });
      
      expect(isTokenValid()).toBe(true);
    });

    it('should return false for expired token', () => {
      const token = 'expired-token';
      const pastTime = Date.now() - 3600000; // 1 hour in past
      
      localStorage.setItem('auth_token', token);
      
      // Mock jwt-decode to return expired token
      (jwtDecode as jest.Mock).mockReturnValue({
        exp: pastTime / 1000,
        sub: '123',
        email: 'test@example.com',
      });
      
      expect(isTokenValid()).toBe(false);
    });

    it('should return false if token decoding fails', () => {
      const token = 'invalid-token';
      localStorage.setItem('auth_token', token);
      
      // Mock jwt-decode to throw an error
      (jwtDecode as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });
      
      expect(isTokenValid()).toBe(false);
    });
  });

  describe('getUserFromToken', () => {
    it('should return null if no token exists', () => {
      expect(getUserFromToken()).toBeNull();
    });

    it('should return user data from valid token', () => {
      const token = 'valid-token';
      const userData = {
        sub: 'user-123',
        email: 'user@example.com',
      };
      
      localStorage.setItem('auth_token', token);
      
      // Mock jwt-decode to return user data
      (jwtDecode as jest.Mock).mockReturnValue(userData);
      
      expect(getUserFromToken()).toEqual({
        id: 'user-123',
        email: 'user@example.com',
      });
    });

    it('should return null if token decoding fails', () => {
      const token = 'invalid-token';
      localStorage.setItem('auth_token', token);
      
      // Mock jwt-decode to throw an error
      (jwtDecode as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });
      
      expect(getUserFromToken()).toBeNull();
    });
  });
}); 