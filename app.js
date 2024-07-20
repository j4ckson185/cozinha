// app.js
import { database, ref, push, set, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from './firebase-config.js';

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const messageForm = document.getElementById('messageForm');
const authDiv = document.getElementById('auth');
const messageSection = document.getElementById('messageSection');
const logoutButton = document.getElementById('logoutButton');

// Lógica de Cadastro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('Usuário cadastrado com sucesso!');
            registerForm.reset();
        })
        .catch((error) => {
            alert('Erro ao cadastrar: ' + error.message);
        });
});

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

// Lógica de Envio de Mensagens
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    sendMessage(message);
});

function sendMessage(message) {
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
        text: message,
        timestamp: Date.now()
    });
    document.getElementById('message').value = '';
}

// Verifica o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    if (user) {
        authDiv.style.display = 'none';
        messageSection.style.display = 'block';
    } else {
        authDiv.style.display = 'block';
        messageSection.style.display = 'none';
    }
});