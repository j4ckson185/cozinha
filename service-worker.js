// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service worker instalado.');
});

self.addEventListener('activate', (event) => {
    console.log('Service worker ativado.');
});

self.addEventListener('fetch', (event) => {
    console.log('Fetch interceptado para:', event.request.url);
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'PLAY_SOUND') {
        clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'PLAY_SOUND'
                });
            });
        });
    }
});
