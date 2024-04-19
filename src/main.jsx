/* eslint-disable react/no-deprecated */
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import { AvatarProvider } from "./components/Profile/AvatarContext";

const queryClient = new QueryClient(); // Create a new instance of QueryClient

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AvatarProvider>
        <App />
      </AvatarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
