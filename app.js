// app.js
const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    sendMessage(message);
});

function sendMessage(message) {
    const newMessageRef = database.ref('messages').push();
    newMessageRef.set({
        text: message,
        timestamp: Date.now()
    });
    document.getElementById('message').value = '';
}
