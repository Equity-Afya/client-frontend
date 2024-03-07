import axios from "axios";

const api = axios.create({
  baseURL: "https://7190-102-210-244-74.ngrok-free.app",
  // Add other configurations as needed
});

export default api;
