
import axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // TODO: fix this
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
