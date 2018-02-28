var version = 2;
var cacheName = `static-cache-${version}`;

self.addEventListener('install', event => {
  console.log('installed')
});

self.addEventListener('fetch', event => {
    console.log(event);
    event.respondWith(content(event.request));
});

function content (req) {
  return fetch(req);
}

/*
function streamContent() {
  try {
    new ReadableStream({});
  }
  catch(e) {
    return new Response("Streams not supported");
  }
  const stream = new ReadableStream({
    start(controller) {
      const startFetch = caches.match('/shell-start2.html');
      const contentFetch = fetch('/sw-stream-render').catch(() => new Response("Failed, soz"));
      const endFetch = caches.match('/shell-end.html');

      function pushStream(stream) {
        const reader = stream.getReader();
        function read() {
          return reader.read().then(result => {
            if (result.done) return;
            controller.enqueue(result.value);
            return read();
          });
        }
        return read();
      }

      startFetch
        .then(response => pushStream(response.body))
        .then(() => contentFetch)
        .then(response => pushStream(response.body))
        .then(() => endFetch)
        .then(response => pushStream(response.body))
        .then(() => controller.close());
    }
  });

  return new Response(stream, {
    headers: {'Content-Type': 'text/html'}
  })
}
*/

self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

