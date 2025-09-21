// student-api.ts
import axios from "axios";

// Create a separate axios instance for Student APIs
const studentAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // student base URL from .env
});

export const doRegister = (userData: unknown) => {
  console.log("StudentAPI BaseURL:", studentAPI.defaults.baseURL, "User:", userData);
  return studentAPI.post("/register", userData);
};

export const doLogin = (userData: unknown) => {
  console.log("StudentAPI BaseURL:", studentAPI.defaults.baseURL, "User:", userData);
  return studentAPI.post("/login", userData);
};
