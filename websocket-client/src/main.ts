import { connectToServer } from './socketClient'
import './style.css'

document.querySelector<HTMLTitleElement>('title')!.textContent = `Web socket - Client ${Math.floor(Math.random() * 100)}`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web socket - Client</h1>

    <span id="server-status">Offline</span>

    <h2>Clients</h2>
    <ul id="clients"></ul>
  </div>
`
connectToServer()