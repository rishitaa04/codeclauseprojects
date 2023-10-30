const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

var audio = new Audio('tune.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
    // audio.play();  
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message); // Emit the message to the server
    messageInput.value = ''; // Clear the input field
});

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', (data) => {
    append(`${data.user}: ${data.message}`, 'left');
});

socket.on('left', (data) => {
    append(`${data.user} left the chat`, 'left');
});