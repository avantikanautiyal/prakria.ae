import { NextResponse } from 'next/server';

export function middleware(req) {
  // Middleware redirect removed to prevent EC2 deployment issues.
  // We use an AuthWrapper in src/app/admin/layout.js instead.
  return NextResponse.next();
}

export const config = {
  matcher: [], // Empty matcher so middleware does not interfere with routes
};
