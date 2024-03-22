import axios from "axios";

const api = axios.create({
  baseURL: "https://36e9-102-210-244-74.ngrok-free.app/api/patients",
});

export default api;
