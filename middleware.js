export const config = { matcher: '/(.*)' };
export default function middleware(request) {
  const PASSWORD = process.env.SITE_PASSWORD || '';
  const auth = request.headers.get('authorization') || '';
  if (auth.startsWith('Basic ')) {
    try { const d=atob(auth.slice(6)); const p=d.slice(d.indexOf(':')+1); if(PASSWORD&&p===PASSWORD) return; } catch(e){}
  }
  return new Response('Authentication required.', { status:401, headers:{'WWW-Authenticate':'Basic realm="Elsewhere private preview"'} });
}
