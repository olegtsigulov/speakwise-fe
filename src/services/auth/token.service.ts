import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'auth-token';

/**
 * Get the JWT token from cookies
 */
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${TOKEN_KEY}=`))
      ?.split('=')[1] || null;
  }
  return null;
}

// Server-side token functionality removed temporarily

/**
 * Set the JWT token in cookie
 */
export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=86400; SameSite=Lax`;
  }
}

/**
 * Remove the JWT token from cookie
 */
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

/**
 * Check if the token is valid
 */
export function isTokenValid(token?: string): boolean {
  const currentToken = token || getToken();
  
  if (!currentToken) {
    return false;
  }
  
  try {
    const decoded: any = jwtDecode(currentToken);
    const currentTime = Date.now() / 1000;
    
    // Check if token has expired
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

/**
 * Extract user data from token
 */
export function getUserFromToken(token?: string): { id: string; email: string } | null {
  const currentToken = token || getToken();
  
  if (!currentToken) {
    return null;
  }
  
  try {
    const decoded: any = jwtDecode(currentToken);
    return {
      id: decoded.sub || decoded.id,
      email: decoded.email,
    };
  } catch (error) {
    return null;
  }
} 