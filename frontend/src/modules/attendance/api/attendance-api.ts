import axios from "axios";

const attendanceAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL3, // Ends at /api/v1/attendance
});

// ✅ Teacher marks attendance
export const markAttendance = (data: {
  rollNo: string;
  status: "Present" | "Absent";
  teacherId: string;
  subject: string;
}) => {
  return attendanceAPI.post("/mark", data);
};

export const getStudentAttendance = (rollNo: string) => {
  return attendanceAPI.get(`/student/${rollNo}`);
};

export const getClassAttendance = (className: string) => {
  return attendanceAPI.get(`/teacher/class?className=${className}`);
};
