import { useEffect, useState } from "react";
import { getClassAttendance } from "@/modules/attendance/api/attendance-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AttendanceRecord {
  _id: string;
  date: string;
  subject: string;
  status: "Present" | "Absent";
  teacher?: { name: string };
}

interface StudentAttendance {
  _id: string;
  name: string;
  rollNo: string;
  class: string;
  attendance?: AttendanceRecord[];
}

const TViewAttendance = () => {
  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState("CSE-A");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // ✅ Fetch full attendance register
  const fetchAttendance = async (className: string) => {
    if (!className.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getClassAttendance(className.trim());
      setStudents(res.data || []);
    } catch (err: any) {
      console.error("❌ Error fetching attendance register:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch attendance register.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance(selectedClass);
  }, [selectedClass]);

  // ✅ Collect all subjects across students
  const subjects = [
    "All",
    ...new Set(
      students.flatMap((s) => s.attendance?.map((a) => a.subject) || [])
    ),
  ];

  // ✅ Apply subject filter
  const filteredStudents = students.map((s) => ({
    ...s,
    attendance:
      selectedFilter === "All"
        ? s.attendance
        : s.attendance?.filter((a) => a.subject === selectedFilter),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Register</h1>

      {/* Class Selector */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-semibold">Select Class:</label>
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

      {/* Subject Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {subjects.map((subj) => (
          <Button
            key={subj}
            variant={selectedFilter === subj ? "default" : "outline"}
            onClick={() => setSelectedFilter(subj)}
          >
            {subj}
          </Button>
        ))}
      </div>

      {loading ? (
        <p>Loading attendance register...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedClass} - Attendance Register ({students.length} Students)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100 text-center">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Roll No</th>
                    <th className="p-2 border">Class</th>
                    <th className="p-2 border">Attendance Records</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((s) => (
                      <tr
                        key={s._id || s.rollNo}
                        className="text-center hover:bg-gray-50 transition"
                      >
                        <td className="p-2 border">{s.name}</td>
                        <td className="p-2 border">{s.rollNo}</td>
                        <td className="p-2 border">{s.class}</td>
                        <td className="p-2 border">
                          {s.attendance && s.attendance.length > 0 ? (
                            <ul className="text-left space-y-1">
                              {s.attendance.map((a) => (
                                <li key={a._id}>
                                  <span className="font-medium">
                                    {new Date(a.date).toLocaleDateString()}
                                  </span>
                                  {" - "}
                                  <span className="italic text-blue-600">
                                    {a.subject}
                                  </span>
                                  {": "}
                                  <span
                                    className={
                                      a.status === "Present"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }
                                  >
                                    {a.status}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-500">No records</span>
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

export default TViewAttendance;
