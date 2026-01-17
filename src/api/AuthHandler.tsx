import axios from 'axios';
import Cookie from 'js-cookie';

// Localhost for testing
const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

// go-pkgz/auth uses HttpOnly cookies
axios.defaults.withCredentials = true;

// Key for storage to track login status in the UI
const LOGGED_IN_KEY = 'isLoggedIn';
const USERNAME_KEY = 'username';

export function getAccessToken(): string | undefined {
  return Cookie.get(LOGGED_IN_KEY);
}

export function getUsername(): string | undefined {
  return Cookie.get(USERNAME_KEY);
}

export function setTokens(token: string, username: string): void {
  // Store a flag to be referenced by other functions since the real JWT is handled by HttpOnly cookies
  Cookie.set(LOGGED_IN_KEY, 'true', { secure: true, sameSite: 'strict' });
  Cookie.set(USERNAME_KEY, username, { secure: true, sameSite: 'strict' });
}

export function clearTokens(): void {
  Cookie.remove(LOGGED_IN_KEY);
  Cookie.remove(USERNAME_KEY);
}

export async function loginAndSetTokens(username: string, password: string): Promise<void> {
  // go-pkgz/auth local provider typically expects 'user' and 'passwd'
  const response = await axios.post(`${API_URL}/auth/local/login`, {
    user: username,
    passwd: password
  });

  // go-pkgz/auth returns { token, user }
  const { token } = response.data;
  if (token) {
    setTokens(token, username);
  }
}

export function logout(): void {
  clearTokens();
  // Optionally, redirect to login
  window.location.href = '/login';
}
