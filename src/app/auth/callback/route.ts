import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      const result = await supabase.auth.exchangeCodeForSession(code);
      
      if (result.error) {
        console.error('Auth callback error:', result.error);
        return NextResponse.redirect(new URL('/sign-in?error=auth_callback_failed', request.url));
      }
    }

    // Successful authentication, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/sign-in?error=auth_callback_failed', request.url));
  }
} 