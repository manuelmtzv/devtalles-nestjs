import { Manager, Socket } from 'socket.io-client'

let socket: Socket;

export function connectToServer(token: string) {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: `${token}`
    }
  })

  socket?.removeAllListeners();
  socket = manager.socket("/messages")

  addListeners()
}

function addListeners() {
  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!
  const clientsList = document.querySelector<HTMLUListElement>('#clients')!

  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
  const messagesList = document.querySelector<HTMLUListElement>('#messages-list')!

  socket.on('connect', () => {
    serverStatusLabel!.textContent = 'Online'
  })

  socket.on('disconnect', () => {
    serverStatusLabel!.textContent = 'Offline'
  })

  socket.on('clients-updated', (clients: string[]) => {
    clientsList!.innerHTML = clients.map(client => `<li>${client}</li>`).join('')
  })  

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (messageInput.value.trim()) {
      socket.emit('message', { id: 'Yo', message: messageInput.value}, )
      messageInput.value = ''
    }
  })

  socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
    messagesList!.innerHTML += `<li>${payload.fullName}: ${payload.message}</li>`
  })
}