import axios from 'axios';
// 10.0.1.1
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
