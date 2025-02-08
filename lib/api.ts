import axios from 'axios';

const DEPLOYED_BASE_URL = 'https://mongo-backend-4prm.onrender.com/api'; 

export const registerUser = async (email: string, password: string, role: string) => {
  return axios.post(`${DEPLOYED_BASE_URL}/register`, { email, password, role });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${DEPLOYED_BASE_URL}/login`, { email, password });
};
