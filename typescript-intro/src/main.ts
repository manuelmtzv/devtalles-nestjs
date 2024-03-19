import "./style.css";
import { person } from "./bases/06-decorators-2";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <p>Hello Vite!</p>
    <pre>${JSON.stringify(person, null, 2)}</pre>
  </div>
`;
