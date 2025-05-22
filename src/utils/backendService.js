import axios from 'axios';

const backendService = axios.create({
  baseURL: 'http://localhost:5000/api', // or your production API URL
  timeout: 10000,
});

export default backendService;
