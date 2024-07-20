// app.js
import { database, ref, push } from './firebase-config.js';

const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    sendMessage(message);
});

function sendMessage(message) {
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef);
    newMessageRef.set({
        text: message,
        timestamp: Date.now()
    });
    document.getElementById('message').value = '';
}
