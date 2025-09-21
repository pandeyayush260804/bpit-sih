import { useEffect, useState } from "react";
import { fetchAllStudents } from "../api/teacher-api";

const TAllStudents = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("All");

  useEffect(() => {
    fetchAllStudents()
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading students...</p>;

  // Filter students by class
  const filteredStudents =
    selectedClass === "All"
      ? students
      : students.filter((s) => s.class === selectedClass);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Students</h1>

      {/* Class Filter Dropdown */}
      <div className="mb-4 flex gap-2 items-center">
        <label htmlFor="classFilter" className="font-medium">
          Filter by Class:
        </label>
        <select
          id="classFilter"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="All">All</option>
          <option value="CSE-A">CSE-A</option>
          <option value="CSE-B">CSE-B</option>
          <option value="CSE-C">CSE-C</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr key={s._id} className="text-center">
                  <td className="border px-4 py-2">{s.name}</td>
                  <td className="border px-4 py-2">{s.email}</td>
                  <td className="border px-4 py-2">{s.class}</td>
                  <td className="border px-4 py-2">{s.year}</td>
                  <td className="border px-4 py-2">{s.rollNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No students found in {selectedClass}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TAllStudents;
