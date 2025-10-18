import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.tsx";
import Client from "./Client.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Client>
      <App />
    </Client>
  </StrictMode>
);
