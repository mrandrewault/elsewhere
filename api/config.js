// Serves the Google Maps key from a private Vercel setting so it is never in the code.
// Set an Environment Variable named GOOGLE_KEY in your Vercel project.
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ key: process.env.GOOGLE_KEY || '' });
}
