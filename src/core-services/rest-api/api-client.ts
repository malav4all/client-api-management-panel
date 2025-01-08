import axios from 'axios';
import { store } from '../../store';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/gateway/', // Replace with your API base URL
  timeout: 10000, // Timeout in ms
});

// Add a request interceptor to inject the accessToken
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken; // Pick the accessToken from Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
