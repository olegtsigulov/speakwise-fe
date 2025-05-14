import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isTokenValidServer, getUserFromTokenServer } from '@/services/auth/token.service.server';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token || !isTokenValidServer(token)) {
    return NextResponse.json(
      { 
        isAuthenticated: false,
        user: null
      }, 
      { status: 401 }
    );
  }
  
  const user = getUserFromTokenServer(token);
  
  return NextResponse.json({
    isAuthenticated: true,
    user
  });
} 