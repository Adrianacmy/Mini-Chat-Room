// make connection

const socket = io.connect('http://localhost:4000');

// query DOM
let message = document.querySelector('#message');
let handle = document.querySelector('#handle');
let send = document.querySelector('#send');
let output = document.querySelector('#output');
let feedback = document.querySelector('#feedback');

// emit event
send.addEventListener('click', () => {
  // chat: name of the message
  // message: actual message
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

// listening for events 
socket.on('chat', data => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}: <strong>${data.message}</p>`
});

socket.on('typing', data => {
  feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
});