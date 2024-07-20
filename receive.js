// receive.js
import { database } from './firebase-config.js';

const messagesDiv = document.getElementById('messages');

database.ref('messages').on('child_added', (snapshot) => {
    const messageData = snapshot.val();
    displayMessage(messageData.text);
});

function displayMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
}
