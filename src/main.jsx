/* eslint-disable react/no-deprecated */
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { AvatarProvider } from "./components/Profile/AvatarContext"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AvatarProvider>
    <App />
    </AvatarProvider>
  </React.StrictMode>
);
