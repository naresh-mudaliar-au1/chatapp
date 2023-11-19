// src/services/api.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/user",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define your API methods
const apiService = {
  signup: async (userData) => {
    try {
      const response = await axiosInstance.post("/signup", userData);
      return response.data;
    } catch (error) {
      return { error: true, data: error.response.data };
    }
  },
  login: async (userData) => {
    try {
      const response = await axiosInstance.post("/login", userData);
      return response.data;
    } catch (error) {
      return { error: true, data: error.response.data };
    }
  },
};

export default apiService;
