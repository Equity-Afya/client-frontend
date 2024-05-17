import axios from "axios";

const api = axios.create({
  baseURL: "https://7bce-102-210-244-74.ngrok-free.app/api/auth/patient",

});

export default api;
