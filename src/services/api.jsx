import axios from "axios";

const api = axios.create({
  baseURL: "https://3f45-102-210-244-74.ngrok-free.app/api/patient",
  // Add other configurations as needed
});

export default api;
