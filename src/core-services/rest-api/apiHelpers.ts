import apiClient from './api-client';

export const getRequest = async (url: string, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'API GET request failed');
  }
};

export const postRequest = async (url: string, data = {}) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'API POST request failed');
  }
};
