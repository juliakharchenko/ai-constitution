const { createClient } = require('@supabase/supabase-js');

function getAllowedOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return null;

  // Allow localhost for development
  if (origin === 'http://localhost:3000') {
    return origin;
  }

  // Allow any Vercel subdomain containing 'ai-constitution' under vercel.app
  const vercelPattern = /^https:\/\/.*ai-constitution\.vercel\.app$/;
  if (vercelPattern.test(origin)) {
    return origin;
  }

  return null; // Reject other origins
}

const corsHeaders = (request) => {
  const allowedOrigin = getAllowedOrigin(request);
  return allowedOrigin
    ? { 'Access-Control-Allow-Origin': allowedOrigin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }
    : {};
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders(request) });
  }

  if (request.method !== 'POST' || new URL(request.url).pathname !== '/log') {
    return new Response('Invalid request', { status: 400, headers: corsHeaders(request) });
  }

  try {
    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );

    const logData = await request.json();
    const { error } = await supabase.from('logs').insert([logData]);

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response('Failed to log', { status: 500, headers: corsHeaders(request) });
    }

    return new Response('Log stored', { status: 200, headers: corsHeaders(request) });
  } catch (error) {
    console.error('Error processing log:', error);
    return new Response('Server error', { status: 500, headers: corsHeaders(request) });
  }
}