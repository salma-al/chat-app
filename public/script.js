const form = document.getElementById('form');
const messages = document.getElementById('messages');

const socket = io();

//msg from server
socket.on('message', (msg) => {
  console.log(msg);
  displayMsg(msg);

  //scroll down
  messages.scrollTop = messages.scrollHeight;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.input.value;
  //   console.log(msg);

  //send msg to server
  socket.emit('chatMsg', msg);

  //   clear msg input
  e.target.elements.input.value = '';
  e.target.elements.input.focus();
});

//display msg to dom
function displayMsg(msg) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<div class=" ${msg.sender}"><p class="text">${msg.text}</p>
  <p class="time">${msg.time}</p></div>`;

  messages.appendChild(div);
}
