export const trackInteraction = async (event: string, data: Record<string, any>) => {
    const payload = {
      event,
      data,
      timestamp: new Date().toISOString(),
      ip: await fetch('https://api.ipify.org?format=json').then(res => res.json()).then(data => data.ip),
    };
    // Send to server endpoint (e.g., PHP backend)
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  };