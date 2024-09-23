import Bun from 'bun';

const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    if (request.method !== 'GET')
      return new Response('Method Not Allowed', { status: 405 });

    const url = new URL(request.url);
    if (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')) {
      return new Response(Bun.file(import.meta.dir + '/index.html'));
    }

    if (url.pathname.endsWith('.js')) {
      return new Response(Bun.file(import.meta.dir + url.pathname), {
        headers: { 'Content-Type': 'application/javascript' },
      });
    }

    // all other routes
    return new Response('Hello!');
  },
});

console.log(`Server listening on http://localhost:${server.port} ...`);
