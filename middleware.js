// middleware.js — server-side password gate for Elsewhere.
// Runs at Vercel's edge and blocks EVERY request until the correct password
// is entered. The password lives in a Vercel Environment Variable named
// SITE_PASSWORD, never in this file or anything the visitor can see.

export const config = { matcher: '/(.*)' };

export default function middleware(request) {
  const PASSWORD = process.env.SITE_PASSWORD || '';
  const auth = request.headers.get('authorization') || '';

  if (auth.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6));            // "username:password"
      const pass = decoded.slice(decoded.indexOf(':') + 1);
      if (PASSWORD && pass === PASSWORD) {
        return; // correct password — let the request through
      }
    } catch (e) { /* fall through to the prompt */ }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Elsewhere private preview"' },
  });
}
