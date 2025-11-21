import { useState, useEffect } from "react";
import { markAttendance, getClassAttendance } from "@/modules/attendance/api/attendance-api";
import { fetchTProfile } from "@/modules/teacher/api/teacher-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StudentAttendance {
  _id: string;
  name: string;
  rollNo: string;
  class: string;
  attendance?: { _id: string; date: string; status: string }[];
}

const TAttendance = () => {
  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState("CSE-A");
  const [marking, setMarking] = useState(false);

  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);

  // Track marked students for tick display
  const [markedStudents, setMarkedStudents] = useState<{ [rollNo: string]: boolean }>({});

  // Fetch teacher profile using email stored in localStorage
  const fetchTeacherProfile = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        setError("No email found in localStorage. Please login first.");
        return;
      }

      const res = await fetchTProfile(email);
      const teacher = res.data;

      setTeacherId(teacher._id);
      setSubject(teacher.subject);
      setError(null);
    } catch (err: any) {
      console.error("❌ Failed to fetch teacher profile:", err.response || err.message);
      setError("Failed to fetch teacher profile. Try again later.");
    }
  };

  // Fetch class attendance
  const fetchAttendance = async (className: string) => {
    if (!className.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getClassAttendance(className.trim());
      setStudents(res.data || []);
    } catch (err: any) {
      console.error("❌ Error fetching class attendance:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch class attendance.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Mark attendance
  const handleMarkAttendance = async (rollNo: string, status: "Present" | "Absent") => {
    if (!teacherId || !subject) {
      setError("Teacher data not loaded. Cannot mark attendance.");
      return;
    }

    try {
      setMarking(true);
      await markAttendance({ rollNo, status, teacherId, subject });
      setMarkedStudents(prev => ({ ...prev, [rollNo]: true })); // mark student as done
      await fetchAttendance(selectedClass);
    } catch (err: any) {
      console.error("❌ Error marking attendance:", err.response || err.message);
      setError("Failed to mark attendance.");
    } finally {
      setMarking(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchTeacherProfile();
      await fetchAttendance(selectedClass);
    };
    init();
  }, [selectedClass]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>

      {!teacherId || !subject ? (
        <p className="text-red-500 mb-4">
          {error || "Loading teacher data... Please make sure you are logged in."}
        </p>
      ) : null}

      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="CSE-A">CSE-A</option>
          <option value="CSE-B">CSE-B</option>
          <option value="CSE-C">CSE-C</option>
        </select>
      </div>

      {loading ? (
        <p>Loading class attendance...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Student List ({students.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-center">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Roll No</th>
                    <th className="p-2 border">Class</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((s) => (
                      <tr key={s._id || s.rollNo} className="text-center hover:bg-gray-50 transition">
                        <td className="p-2 border">{s.name}</td>
                        <td className="p-2 border">{s.rollNo}</td>
                        <td className="p-2 border">{s.class}</td>
                        <td className="p-2 border space-x-2 flex justify-center items-center">
                          <Button
                            size="sm"
                            className="bg-green-600 text-white"
                            disabled={marking || markedStudents[s.rollNo]}
                            onClick={() => handleMarkAttendance(s.rollNo, "Present")}
                          >
                            Present
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 text-white"
                            disabled={marking || markedStudents[s.rollNo]}
                            onClick={() => handleMarkAttendance(s.rollNo, "Absent")}
                          >
                            Absent
                          </Button>
                          {markedStudents[s.rollNo] && (
                            <span className="ml-2 text-green-600 font-bold text-xl">✔️</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-gray-500 text-center">
                        No students found in {selectedClass}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TAttendance;
