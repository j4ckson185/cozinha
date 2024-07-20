// receive.js
import { database, ref, onChildAdded } from './firebase-config.js';

const messagesDiv = document.getElementById('messages');
const messagesRef = ref(database, 'messages');

onChildAdded(messagesRef, (snapshot) => {
    const messageData = snapshot.val();
    displayMessage(messageData.text);
});

function displayMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
}
