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

self.addEventListener('push', (event) => {
    const data = event.data.json();
    console.log('Push recebido:', data);

    const options = {
        body: data.body,
        icon: 'https://i.ibb.co/jZ6rbSp/logo-cabana.png',
        badge: 'https://i.ibb.co/jZ6rbSp/logo-cabana.png',
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'PLAY_SOUND') {
        playNotificationSound();
    }
});

function playNotificationSound() {
    const audio = new Audio('assets/notification.mp3');
    audio.play().catch(error => {
        console.error('Erro ao reproduzir o som de notificação:', error);
    });
}
