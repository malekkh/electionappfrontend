// src/services/authService.ts
import axios from "axios";

// Define the API base URL if needed
const API_URL = "http://localhost:5000/api";

// Login API call
export const login = async (userName: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/login`, { userName, password });
  return response.data; // This will be the token or user data
};

// Register API call
export const register = async (email: string, password: string, name: string) => {
  const response = await axios.post(`${API_URL}/users/register`, { email, password, name });
  return response.data; // Return any relevant data after successful registration
};

// Example of a function with dynamic parameters for fetching user profile
export const getUserProfile = async (userId: string) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
};
