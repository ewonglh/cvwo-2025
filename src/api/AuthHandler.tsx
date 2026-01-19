import apiClient from './apiClient';
import Cookie from 'js-cookie';

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
  const isSecure = window.location.protocol === 'https:';
  Cookie.set(LOGGED_IN_KEY, 'true', { secure: isSecure, sameSite: 'strict' });
  Cookie.set(USERNAME_KEY, username, { secure: isSecure, sameSite: 'strict' });
}

export function clearTokens(): void {
  Cookie.remove(LOGGED_IN_KEY);
  Cookie.remove(USERNAME_KEY);
}

export async function loginAndSetTokens(username: string, password: string): Promise<void> {
  // go-pkgz/auth local provider typically expects 'user' and 'passwd'
  const response = await apiClient.post(`/auth/local/login`, {
    user: username,
    passwd: password
  });

  // If we got a 200 OK, the login was successful.
  // The actual JWT is handled by HttpOnly cookies, so we just set our UI flags.
  setTokens('', username);
}

export function logout(): void {
  clearTokens();
}
