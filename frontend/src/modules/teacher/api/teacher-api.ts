// teacher-api.ts
import axios from "axios";

// Create a separate axios instance for Teacher APIs
const teacherAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL2, // teacher base URL from .env
});

export const doTRegister = (userData: unknown) => {
  console.log("TeacherAPI BaseURL:", teacherAPI.defaults.baseURL, "Teacher user data:", userData);
  return teacherAPI.post("/register", userData);
};

export const doTLogin = (userData: unknown) => {
  console.log("TeacherAPI BaseURL:", teacherAPI.defaults.baseURL, "Teacher user data:", userData);
  return teacherAPI.post("/login", userData);
};

export const fetchTProfile = (email: string) => {
  console.log("Fetching Teacher Profile for email:", email);
  return teacherAPI.get(`/profile?email=${email}`);
};

export const fetchAllStudents = () => {
  return teacherAPI.get("/students");
};