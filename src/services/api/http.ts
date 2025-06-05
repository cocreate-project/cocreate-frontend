import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL,
});

export default http;
