import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your Express backend base URL
});

export default axiosInstance;
