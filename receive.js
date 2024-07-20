// receive.js
import { database, ref, onChildAdded, remove, auth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from './firebase-config.js';

const loginForm = document.getElementById('loginForm');
const authDiv = document.getElementById('auth');
const messagesSection = document.getElementById('messagesSection');
const messagesDiv = document.getElementById('messages');
const logoutButton = document.getElementById('logoutButton');
const deleteAllButton = document.getElementById('deleteAllButton');

// Lógica de Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            loginForm.reset();
        })
        .catch((error) => {
            alert('Erro ao entrar: ' + error.message);
        });
});

// Lógica de Logout
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Logout bem-sucedido
    }).catch((error) => {
        alert('Erro ao sair: ' + error.message);
    });
});

// Apagar todas as mensagens
deleteAllButton.addEventListener('click', () => {
    const messagesRef = ref(database, 'messages');
    remove(messagesRef).then(() => {
        messagesDiv.innerHTML = '';
    }).catch((error) => {
        alert('Erro ao apagar mensagens: ' + error.message);
    });
});

// Verifica o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    if (user) {
        authDiv.style.display = 'none';
        messagesSection.style.display = 'block';
        loadMessages();
    } else {
        authDiv.style.display = 'block';
        messagesSection.style.display = 'none';
    }
});

function loadMessages() {
    const messagesRef = ref(database, 'messages');
    messagesDiv.innerHTML = ''; // Limpa as mensagens existentes
    onChildAdded(messagesRef, (snapshot) => {
        const messageData = snapshot.val();
        const messageId = snapshot.key;
        displayMessage(messageId, messageData.text);
    });
}

function displayMessage(messageId, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-item');
    messageElement.innerHTML = `
        <p>${message}</p>
        <button class="deleteButton" onclick="deleteMessage('${messageId}')">x</button>
    `;
    messagesDiv.appendChild(messageElement);
}

window.deleteMessage = function(messageId) {
    const messageRef = ref(database, 'messages/' + messageId);
    remove(messageRef).then(() => {
        document.querySelector(`button[onclick="deleteMessage('${messageId}')"]`).parentElement.remove();
    }).catch((error) => {
        alert('Erro ao apagar mensagem: ' + error.message);
    });
}