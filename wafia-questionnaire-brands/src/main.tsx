import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        className:
          "glass-panel border border-white/10 text-white backdrop-blur-xl",
      }}
      closeButton
      richColors
      theme="dark"
    />
  </StrictMode>
);
