import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.88.141:5500/api/auth/patient/",

});

export default api;
