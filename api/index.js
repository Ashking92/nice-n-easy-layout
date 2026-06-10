import { server } from '../dist/server.js';

export default async function handler(req, res) {
  try {
    // Convert Node.js req/res to Fetch API format
    const url = `http://${req.headers.host}${req.url}`;
    const headers = new Headers(req.headers);
    
    // Remove host header to avoid conflicts
    headers.delete('host');

    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      // For POST/PUT/DELETE, buffer the body
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
      });
    }

    const response = await server.fetch(
      new Request(url, {
        method: req.method,
        headers: headers,
        body: body || undefined,
      })
    );

    // Set response headers
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });

    // Set status and stream response body
    res.status(response.status);
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
