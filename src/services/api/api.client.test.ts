import { ApiClient } from './api.client';
import { getToken, removeToken } from '../auth/token.service';

// Импортируем мокированный axios
import axios from 'axios';

// Мок для axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  }))
}));

// Мок для token.service
jest.mock('../auth/token.service', () => ({
  getToken: jest.fn(),
  removeToken: jest.fn(),
}));

describe('ApiClient', () => {
  let apiClient: ApiClient;
  const mockAxiosInstance = (axios.create as jest.Mock)();
  
  beforeEach(() => {
    jest.clearAllMocks();
    apiClient = new ApiClient();
  });
  
  describe('constructor', () => {
    it('should create axios instance with correct config', () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3001/api',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
    
    it('should set up request and response interceptors', () => {
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });
  
  describe('request interceptor', () => {
    it('should add auth token to request headers when token exists', () => {
      // Get the request interceptor function
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      
      // Mock token service to return a token
      (getToken as jest.Mock).mockReturnValue('test-token');
      
      // Create a mock request config
      const config = {
        headers: {},
      };
      
      // Execute the interceptor
      const result = requestInterceptor(config);
      
      // Check that the token was added
      expect(result.headers.Authorization).toBe('Bearer test-token');
    });
    
    it('should not modify headers when token is not present', () => {
      // Get the request interceptor function
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      
      // Mock token service to return null
      (getToken as jest.Mock).mockReturnValue(null);
      
      // Create a mock request config
      const config = {
        headers: {},
      };
      
      // Execute the interceptor
      const result = requestInterceptor(config);
      
      // Check that Authorization header was not added
      expect(result.headers.Authorization).toBeUndefined();
    });
  });
  
  describe('response interceptor', () => {
    it('should handle 401 error by removing token and redirecting', async () => {
      // Get the response error interceptor function
      const responseErrorInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      // Create a mock 401 error
      const error = {
        response: {
          status: 401,
        },
      };
      
      // Spy on global location
      const originalLocation = window.location;
      const locationMock = { href: '' };
      Object.defineProperty(window, 'location', { value: locationMock, writable: true });
      
      try {
        // Execute the interceptor (should reject)
        await expect(responseErrorInterceptor(error)).rejects.toEqual(error);
        
        // Check that token was removed
        expect(removeToken).toHaveBeenCalled();
        
        // Check redirection
        expect(locationMock.href).toBe('/login');
      } finally {
        // Restore original location
        Object.defineProperty(window, 'location', { value: originalLocation });
      }
    });
    
    it('should propagate non-401 errors', async () => {
      // Get the response error interceptor function
      const responseErrorInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      // Create a mock 500 error
      const error = {
        response: {
          status: 500,
        },
      };
      
      // Execute the interceptor (should reject with the original error)
      await expect(responseErrorInterceptor(error)).rejects.toEqual(error);
      
      // Check that token was NOT removed
      expect(removeToken).not.toHaveBeenCalled();
    });
  });
  
  describe('request methods', () => {
    const mockResponse = {
      data: { result: 'success' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    
    it('should call axios.get for get method', async () => {
      mockAxiosInstance.get.mockResolvedValue(mockResponse);
      
      const result = await apiClient.get('/test');
      
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
      expect(result).toEqual(mockResponse.data);
    });
    
    it('should call axios.post for post method', async () => {
      mockAxiosInstance.post.mockResolvedValue(mockResponse);
      const data = { key: 'value' };
      
      const result = await apiClient.post('/test', data);
      
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', data, undefined);
      expect(result).toEqual(mockResponse.data);
    });
    
    it('should call axios.put for put method', async () => {
      mockAxiosInstance.put.mockResolvedValue(mockResponse);
      const data = { key: 'value' };
      
      const result = await apiClient.put('/test', data);
      
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test', data, undefined);
      expect(result).toEqual(mockResponse.data);
    });
    
    it('should call axios.delete for delete method', async () => {
      mockAxiosInstance.delete.mockResolvedValue(mockResponse);
      
      const result = await apiClient.delete('/test');
      
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test', undefined);
      expect(result).toEqual(mockResponse.data);
    });
    
    it('should call axios.patch for patch method', async () => {
      mockAxiosInstance.patch.mockResolvedValue(mockResponse);
      const data = { key: 'value' };
      
      const result = await apiClient.patch('/test', data);
      
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test', data, undefined);
      expect(result).toEqual(mockResponse.data);
    });
  });
}); 