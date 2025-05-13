import { ApiClient } from './api.client';

// Create a singleton instance of the ApiClient
export const apiClient = new ApiClient();

// Export the client methods for convenience
export const apiService = {
  get: apiClient.get.bind(apiClient),
  post: apiClient.post.bind(apiClient),
  put: apiClient.put.bind(apiClient),
  delete: apiClient.delete.bind(apiClient),
  patch: apiClient.patch.bind(apiClient),
}; 