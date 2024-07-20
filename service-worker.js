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
        playNotificationSound();
    }
});

function playNotificationSound() {
    const audio = new Audio('assets/notification.mp3');
    audio.play().catch(error => {
        console.error('Erro ao reproduzir o som de notificação:', error);
    });
}
