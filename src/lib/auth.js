import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Get the admin session from cookies.
 * Returns the session cookie value or null if not authenticated.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session && session.value ? session.value : null;
}

/**
 * Returns a standard 401 Unauthorized response.
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, message: 'Unauthorized' },
    { status: 401 }
  );
}
