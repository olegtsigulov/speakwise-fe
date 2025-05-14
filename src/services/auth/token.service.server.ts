import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'auth-token';

/**
 * Get token from server components/API routes
 */
export function getServerToken(): string | null {
  return cookies().get(TOKEN_KEY)?.value || null;
}

/**
 * Check if the token is valid (server-side)
 */
export function isTokenValidServer(token: string): boolean {
  if (!token) {
    return false;
  }
  
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token has expired
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

/**
 * Extract user data from token (server-side)
 */
export function getUserFromTokenServer(token: string): { id: string; email: string } | null {
  if (!token) {
    return null;
  }
  
  try {
    const decoded: any = jwtDecode(token);
    return {
      id: decoded.sub || decoded.id,
      email: decoded.email,
    };
  } catch (error) {
    return null;
  }
} 