import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

export const registerUser = async (email: string, password: string, role: string) => {
  return axios.post(`${API_BASE_URL}/register`, { email, password, role });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/login`, { email, password });
};
