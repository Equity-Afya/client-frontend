import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.89.43:5500/api/auth/patient",

});

export default api;
