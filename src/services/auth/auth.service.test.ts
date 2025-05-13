import { authService } from './auth.service';
import { apiService } from '../api/api.service';
import { setToken, removeToken } from './token.service';

// Mock the API service and token service
jest.mock('../api/api.service', () => ({
  apiService: {
    post: jest.fn(),
  },
}));

jest.mock('./token.service', () => ({
  setToken: jest.fn(),
  removeToken: jest.fn(),
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockResponse = {
      token: 'test-token',
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        companyName: 'Test Company',
        companyDomain: 'testcompany.com',
      },
    };

    it('should make a POST request to /auth/login', async () => {
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      await authService.login(mockCredentials);

      expect(apiService.post).toHaveBeenCalledWith('/auth/login', mockCredentials);
    });

    it('should store token on successful login', async () => {
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      await authService.login(mockCredentials);

      expect(setToken).toHaveBeenCalledWith(mockResponse.token);
    });

    it('should return the response on successful login', async () => {
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login(mockCredentials);

      expect(result).toEqual(mockResponse);
    });

    it('should not store token if response does not contain token', async () => {
      const responseWithoutToken = { ...mockResponse, token: undefined };
      (apiService.post as jest.Mock).mockResolvedValue(responseWithoutToken);

      await authService.login(mockCredentials);

      expect(setToken).not.toHaveBeenCalled();
    });

    it('should propagate errors from the API', async () => {
      const mockError = new Error('Network error');
      (apiService.post as jest.Mock).mockRejectedValue(mockError);

      await expect(authService.login(mockCredentials)).rejects.toThrow('Network error');
    });
  });

  describe('register', () => {
    const mockRegisterData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      companyName: 'Test Company',
      companyDomain: 'testcompany.com',
    };

    const mockResponse = {
      token: 'test-token',
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        companyName: 'Test Company',
        companyDomain: 'testcompany.com',
      },
    };

    it('should make a POST request to /auth/register', async () => {
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      await authService.register(mockRegisterData);

      expect(apiService.post).toHaveBeenCalledWith('/auth/register', mockRegisterData);
    });

    it('should store token on successful registration', async () => {
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      await authService.register(mockRegisterData);

      expect(setToken).toHaveBeenCalledWith(mockResponse.token);
    });

    it('should return the response on successful registration', async () => {
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.register(mockRegisterData);

      expect(result).toEqual(mockResponse);
    });

    it('should not store token if response does not contain token', async () => {
      const responseWithoutToken = { ...mockResponse, token: undefined };
      (apiService.post as jest.Mock).mockResolvedValue(responseWithoutToken);

      await authService.register(mockRegisterData);

      expect(setToken).not.toHaveBeenCalled();
    });

    it('should propagate errors from the API', async () => {
      const mockError = new Error('Network error');
      (apiService.post as jest.Mock).mockRejectedValue(mockError);

      await expect(authService.register(mockRegisterData)).rejects.toThrow('Network error');
    });
  });

  describe('logout', () => {
    it('should remove token on logout', () => {
      authService.logout();

      expect(removeToken).toHaveBeenCalled();
    });
  });
}); 