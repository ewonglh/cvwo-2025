import axios, { AxiosResponse } from 'axios';
import Cookie from 'js-cookie';

// Localhost for testing
const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

// Token keys for storage
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export function getAccessToken(): string | undefined {
  return Cookie.get(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | undefined {
  return Cookie.get(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  Cookie.set(ACCESS_TOKEN_KEY, accessToken, { secure: true, sameSite: 'strict' });
  Cookie.set(REFRESH_TOKEN_KEY, refreshToken, { secure: true, sameSite: 'strict' });
}

export function clearTokens(): void {
  Cookie.remove(ACCESS_TOKEN_KEY);
  Cookie.remove(REFRESH_TOKEN_KEY);
}

// Function to refresh access token
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response: AxiosResponse<{ accessToken: string }> = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken,
    });
    const newAccessToken = response.data.accessToken;
    // More secure way to store token yay
    Cookie.set(ACCESS_TOKEN_KEY, newAccessToken, { secure: true, sameSite: 'strict' });
    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearTokens();
    // Optionally, redirect to login
    window.location.href = '/login';
    return null;
  }
}

// Attach access token to outgoing requests
axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export async function loginAndSetTokens(username: string, password: string): Promise<void> {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  const { accessToken, refreshToken } = response.data;
  setTokens(accessToken, refreshToken);
}

export function logout(): void {
  clearTokens();
  // Optionally, redirect to login
  window.location.href = '/login';
}