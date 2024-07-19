import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://192.168.91.174:5500',
  // No need for httpsAgent in the browser
  // Use this flag to allow self-signed certificates
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
