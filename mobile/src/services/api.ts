import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.73:8080',
});

export default api;
