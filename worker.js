const { createClient } = require('@supabase/supabase-js');

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method !== 'POST' || new URL(request.url).pathname !== '/log') {
    return new Response('Invalid request', { status: 400 });
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
      return new Response('Failed to log', { status: 500 });
    }

    return new Response('Log stored', { status: 200 });
  } catch (error) {
    console.error('Error processing log:', error);
    return new Response('Server error', { status: 500 });
  }
}