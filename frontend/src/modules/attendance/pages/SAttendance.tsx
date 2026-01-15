import { useEffect, useState } from "react";
import { getStudentAttendance } from "@/modules/attendance/api/attendance-api.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AttendanceRecord {
  _id: string;
  date: string;
  subject: string;
  status: "Present" | "Absent";
  teacher?: { name: string };
}

const SAttendance = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [filteredAttendance, setFilteredAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      setError("No email found in localStorage.");
      setLoading(false);
      return;
    }

    // Fetch student profile first
    fetch(`https://bpit-sih.onrender.com/api/v1/student/profile?email=${email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student profile");
        return res.json();
      })
      .then((profile) => {
        const rollNo = profile.rollNo;
        if (!rollNo) throw new Error("Roll number missing in profile");
        return getStudentAttendance(rollNo);
      })
      .then((res) => {
        setAttendance(res.data || []);
        setFilteredAttendance(res.data || []);
      })
      .catch((err) => {
        setError("Failed to fetch attendance. Check console for details.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter logic
  const handleFilter = (subject: string) => {
    setSelectedFilter(subject);
    if (subject === "All") {
      setFilteredAttendance(attendance);
    } else {
      setFilteredAttendance(attendance.filter((a) => a.subject === subject));
    }
  };

  const total = filteredAttendance.length;
  const presentCount = filteredAttendance.filter((a) => a.status === "Present").length;
  const percentage = total > 0 ? ((presentCount / total) * 100).toFixed(2) : "0";

  if (loading) return <p className="p-6">Loading attendance...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;

  // ✅ Collect unique subjects dynamically
  const subjects = ["All", ...new Set(attendance.map((a) => a.subject))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Attendance</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {subjects.map((subj) => (
          <Button
            key={subj}
            variant={selectedFilter === subj ? "default" : "outline"}
            onClick={() => handleFilter(subj)}
          >
            {subj}
          </Button>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Summary ({selectedFilter})</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Total Classes:</strong> {total}</p>
          <p><strong>Present:</strong> {presentCount}</p>
          <p><strong>Attendance %:</strong> {percentage}%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Records</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">Teacher</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((a) => (
                  <tr key={a._id} className="text-center">
                    <td className="p-2 border">{new Date(a.date).toLocaleDateString()}</td>
                    <td className="p-2 border">{a.subject}</td>
                    <td className="p-2 border">{a.teacher?.name || "N/A"}</td>
                    <td
                      className={`p-2 border font-semibold ${
                        a.status === "Present" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {a.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-gray-500 text-center">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SAttendance;
