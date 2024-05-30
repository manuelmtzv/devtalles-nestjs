import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js")

  const socket = manager.socket("/messages")

  addListeners(socket)
}

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')
  const clientsList = document.querySelector<HTMLUListElement>('#clients')

  socket.on('connect', () => {
    serverStatusLabel!.textContent = 'Online'
  })

  socket.on('disconnect', () => {
    serverStatusLabel!.textContent = 'Offline'
  })

  socket.on('clients-updated', (clients: string[]) => {
    clientsList!.innerHTML = clients.map(client => `<li>${client}</li>`).join('')
  })
}