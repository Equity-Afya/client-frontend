import axios from "axios";

const api = axios.create({
  baseURL: "https://cfc0-102-210-244-74.ngrok-free.app/api/patient/register",
  // Add other configurations as needed
});

export default api;
