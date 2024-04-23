import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.88.44:5500/api",
  // Add other configurations as needed
});

export default api;
