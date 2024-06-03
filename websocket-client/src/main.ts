import { connectToServer } from './socketClient'
import './style.css'

document.querySelector<HTMLTitleElement>('title')!.textContent = `Web socket - Client ${Math.floor(Math.random() * 100)}`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web socket - Client</h1>

    <input id="jwtToken" placeholder="JWT Token" />
    <button id="connect">Connect</button>
    <br />

    <span id="server-status">Offline</span>

    <h2>Clients</h2>
    <ul id="clients"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>

    <ul id="messages-list">
    </ul>
  </div>
`
// connectToServer()



const inputJwt = document.querySelector<HTMLInputElement>('#jwtToken')!
const connectButton = document.querySelector<HTMLButtonElement>('#connect')!

connectButton.addEventListener('click', () => {
  const token = inputJwt.value.trim()

  if (!token.length) return alert('Please enter a JWT Token')

  connectToServer(token);
})