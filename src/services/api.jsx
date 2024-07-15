import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.88.198:5500/api/auth/patient/register",

});

export default api;
