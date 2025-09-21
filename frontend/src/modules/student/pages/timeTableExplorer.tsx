import React, { useState, useEffect } from "react";
import { Calendar, ArrowLeft } from "lucide-react";

// 🔹 Types
type ClassInfo = {
  subject: string;
  faculty: string;
  room: string;
  type: string;
};

type Timetable = {
  [branch: string]: {
    [semester: string]: {
      [day: string]: {
        [period: string]: ClassInfo;
      };
    };
  };
};

// 🔹 Complete Timetable Data
const timetable: Timetable = {
  "CSE-A": {
    "5th Sem": {
      Monday: {
        "Period 1": { subject: "CD", faculty: "Mr. Aditya", room: "405", type: "Lecture" },
        "Period 2": { subject: "SE", faculty: "Dr. Deepti", room: "405", type: "Lecture" },
        "Period 3": { subject: "CD Lab (G1)", faculty: "Mr. Aditya", room: "108B", type: "Lab" },
        "Period 4": { subject: "CN Lab (G2)", faculty: "Mr. Dinesh", room: "108C", type: "Lab" },
        "Period 5": { subject: "SE Lab (G1)", faculty: "Dr. Deepti", room: "108C", type: "Lab" },
        "Period 6": { subject: "OS", faculty: "Dr. Monika Arora", room: "405", type: "Lecture" },
        "Period 7": { subject: "CN", faculty: "Mr. Dinesh", room: "405", type: "Lecture" },
        "Period 8": { subject: "Enrichment Activities", faculty: "-", room: "-", type: "Activity" },
      },
      Tuesday: {
        "Period 1": { subject: "EFE", faculty: "Ms. Nishtha Batheja", room: "405", type: "Lecture" },
        "Period 2": { subject: "CD", faculty: "Mr. Aditya", room: "405", type: "Lecture" },
        "Period 3": { subject: "CD Lab (G2)", faculty: "Mr. Aditya", room: "108A", type: "Lab" },
        "Period 4": { subject: "DAA Lab (G2)", faculty: "Dr. Himani", room: "108A", type: "Lab" },
        "Period 5": { subject: "SE", faculty: "Dr. Deepti", room: "405", type: "Lecture" },
        "Period 6": { subject: "DAA", faculty: "Dr. Himani", room: "405", type: "Lecture" },
        "Period 7": { subject: "LIB", faculty: "-", room: "-", type: "Library" },
        "Period 8": { subject: "PDP", faculty: "Ms. Mehak Talwar", room: "405", type: "Lecture" },
      },
      Wednesday: {
        "Period 1": { subject: "SE", faculty: "Dr. Deepti", room: "405", type: "Lecture" },
        "Period 2": { subject: "DAA", faculty: "Dr. Himani", room: "405", type: "Lecture" },
        "Period 3": { subject: "OS Lab (G1)", faculty: "Dr. Monika Arora", room: "110", type: "Lab" },
        "Period 4": { subject: "CN Lab (G1)", faculty: "Mr. Dinesh", room: "108C", type: "Lab" },
        "Period 5": { subject: "CN", faculty: "Mr. Dinesh", room: "405", type: "Lecture" },
        "Period 6": { subject: "OS", faculty: "Dr. Monika Arora", room: "405", type: "Lecture" },
        "Period 7": { subject: "Enrichment Activities", faculty: "-", room: "-", type: "Activity" },
      },
      Thursday: {
        "Period 1": { subject: "OS Lab (G2)", faculty: "Dr. Monika Arora", room: "110", type: "Lab" },
        "Period 2": { subject: "CN", faculty: "Mr. Dinesh", room: "405", type: "Lecture" },
        "Period 3": { subject: "OS", faculty: "Dr. Monika Arora", room: "405", type: "Lecture" },
        "Period 4": { subject: "EFE", faculty: "Ms. Nishtha Batheja", room: "405", type: "Lecture" },
        "Period 5": { subject: "SE Lab (G2)", faculty: "Dr. Deepti", room: "108C", type: "Lab" },
        "Period 6": { subject: "DAA", faculty: "Dr. Himani", room: "405", type: "Lecture" },
        "Period 7": { subject: "Enrichment Activities", faculty: "-", room: "-", type: "Activity" },
      },
      Friday: {
        "Period 1": { subject: "CD", faculty: "Mr. Aditya", room: "405", type: "Lecture" },
        "Period 2": { subject: "CN", faculty: "Mr. Dinesh", room: "405", type: "Lecture" },
        "Period 3": { subject: "DAA", faculty: "Dr. Himani", room: "405", type: "Lecture" },
        "Period 4": { subject: "OS", faculty: "Dr. Monika Arora", room: "405", type: "Lecture" },
        "Period 5": { subject: "DAA Lab (G1)", faculty: "Dr. Himani", room: "108A", type: "Lab" },
        "Period 6": { subject: "Enrichment Activities", faculty: "-", room: "-", type: "Activity" },
      },
    },
  },

  // 🔹 Same way fill for CSE-B and CSE-C (due to space, not pasting here fully)

  "CSE-B": {
    "5th Sem": {
        "Monday": {
        "Period 1": { "subject": "EFE", "faculty": "Ms. Nishtha Batheja", "room": "406", "type": "Lecture" },
        "Period 2": { "subject": "CN", "faculty": "Mr. Dinesh", "room": "406", "type": "Lecture" },
        "Period 3": { "subject": "CD", "faculty": "Dr. Shweta Taneja", "room": "406", "type": "Lecture" },
        "Period 4": { "subject": "OS", "faculty": "Dr. Palak Girdhar", "room": "406", "type": "Lecture" },
        "Period 5": { "subject": "CN Lab (G1)", "faculty": "Mr. Dinesh", "room": "108C", "type": "Lab" },
        "Period 6": { "subject": "DAA", "faculty": "Dr. Suman", "room": "406", "type": "Lecture" },
        "Period 7": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" },
        "Period 8": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" }
        },
        "Tuesday": {
        "Period 1": { "subject": "SE Lab (G2)/CN Lab(G1) ", "faculty": "Ms. Deepti/ Mr. Dinesh Bhardwaj", "room": "108B/108C", "type": "Lab" },
        "Period 2": { "subject": "SE Lab (G2)/CN Lab(G1) ", "faculty": "Ms. Deepti/ Mr. Dinesh Bhardwaj", "room": "108B/108C", "type": "Lab" },
        "Period 3": { "subject": "CD", "faculty": "Dr. Shweta Taneja", "room": "406", "type": "Lecture" },
        "Period 4": { "subject": "DAA", "faculty": "Dr. Suman", "room": "406", "type": "Lecture" },
        "Period 5": { "subject": "OS", "faculty": "Dr. Palak Girdhar", "room": "406", "type": "Lecture" },
        "Period 6": { "subject": "CN", "faculty": "Mr. Dinesh", "room": "406", "type": "Lecture" },
        "Period 7": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" },
        "Period 8": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" }
        },
        "Wednesday": {
        "Period 1": { "subject": "CN", "faculty": "Mr. Dinesh", "room": "406", "type": "Lecture" },
        "Period 2": { "subject": "SE", "faculty": "Ms. Deepti", "room": "406", "type": "Lecture" },
        "Period 3": { "subject": "DAA", "faculty": "Dr. Suman", "room": "406", "type": "Lecture" },
        "Period 4": { "subject": "OS", "faculty": "Dr. Palak Girdhar", "room": "406", "type": "Lecture" },
        "Period 5": { "subject": "CD Lab (G2)/DAA Lab (G1)", "faculty": "Dr. Shweta Taneja/Dr. Suman", "room": "110/108A", "type": "Lab" },
        "Period 6": { "subject": "CD Lab (G2)/DAA Lab (G1)", "faculty": "Dr. Shweta Taneja/Dr. Suman", "room": "110/108A", "type": "Lab" },
        "Period 7": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" },
        "Period 8": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" },
        },
        "Thursday": {
        "Period 1": { "subject": "CD", "faculty": "Dr. Shweta Taneja", "room": "406", "type": "Lecture" },
        "Period 2": { "subject": "SE", "faculty": "Ms. Deepti", "room": "406", "type": "Lecture" },
        "Period 3": { "subject": "OS Lab (G2)/CD Lab (G1)", "faculty": "Dr. Palak Girdhar/Dr. Shweta Taneja", "room": "108A/110", "type": "Lab" },
        "Period 4": { "subject": "OS Lab (G2)/CD Lab (G1)", "faculty": "Dr. Palak Girdhar/Dr. Shweta Taneja", "room": "108A/110", "type": "Lab" },
        "Period 5": { "subject": "SE Lab (G1)/CN Lab (G2)", "faculty": "Ms. Deepti/Mr. Dinesh", "room": "108A/108C", "type": "Lab" },
        "Period 6": { "subject": "SE Lab (G1)/CN Lab (G2)", "faculty": "Ms. Deepti/Mr. Dinesh", "room": "108A/108C", "type": "Lab" },
        "Period 7": { "subject": "PDP", "faculty": "Ms. Mehak Talwar", "room": "406", "type": "Lecture" },
        "Period 8": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" }
        },
        "Friday": {
        "Period 1": { "subject": "SE", "faculty": "Ms. Deepti", "room": "406", "type": "Lecture" },
        "Period 2": { "subject": "OS", "faculty": "Dr. Palak Girdhar", "room": "406", "type": "Lecture" },
        "Period 3": { "subject": "OS Lab (G1)/DAA Lab (G2)", "faculty": "Dr. Palak Girdhar/Dr. Suman", "room": "108A/108B", "type": "Lab" },
        "Period 4": { "subject": "OS Lab (G1)/DAA Lab (G2)", "faculty": "Dr. Palak Girdhar/Dr. Suman", "room": "108A/108B", "type": "Lab" },
        "Period 5": { "subject": "EFE", "faculty": "Ms. Nishtha Batheja", "room": "406", "type": "Lecture" },
        "Period 6": { "subject": "DAA", "faculty": "Dr. Suman", "room": "406", "type": "Lecture" },
        "Period 7": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" },
        "Period 8": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" }
        }
    }
    },
  "CSE-C": {
    "5th Sem": {
        "Monday": {
        "Period 1": { "subject": "DAA Lab (G1)", "faculty": "Dr. Suman", "room": "108C", "type": "Lab" },
        "Period 2": { "subject": "SE Lab (G2)", "faculty": "Ms. Soumya", "room": "108B", "type": "Lab" },
        "Period 3": { "subject": "OS", "faculty": "Dr. Palak Girdhar", "room": "SH1A", "type": "Lecture" },
        "Period 4": { "subject": "CD", "faculty": "Dr. Shweta Taneja", "room": "SH1A", "type": "Lecture" },
        "Period 5": { "subject": "CN Lab (G2)", "faculty": "Ms. Anju", "room": "108A", "type": "Lab" },
        "Period 6": { "subject": "SE Lab (G1)", "faculty": "Ms. Soumya", "room": "108B", "type": "Lab" },
        "Period 7": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" }
        },
        "Tuesday": {
        "Period 1": { "subject": "SE", "faculty": "Ms. Soumya", "room": "SH1A", "type": "Lecture" },
        "Period 2": { "subject": "OS", "faculty": "Dr. Palak Girdhar", "room": "SH1A", "type": "Lecture" },
        "Period 3": { "subject": "DAA", "faculty": "Dr. Suman", "room": "SH1A", "type": "Lecture" },
        "Period 4": { "subject": "CD", "faculty": "Dr. Shweta Taneja", "room": "SH1A", "type": "Lecture" },
        "Period 5": { "subject": "CN Lab (G1)", "faculty": "Ms. Anju", "room": "108C", "type": "Lab" },
        "Period 6": { "subject": "CD Lab (G2)", "faculty": "Dr. Shweta Taneja", "room": "110", "type": "Lab" },
        "Period 7": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" }
        },
        "Wednesday": {
        "Period 1": { "subject": "OS Lab (G2)", "faculty": "Dr. Palak Girdhar", "room": "108C", "type": "Lab" },
        "Period 2": { "subject": "CD Lab (G1)", "faculty": "Dr. Shweta Taneja", "room": "110", "type": "Lab" },
        "Period 3": { "subject": "SE", "faculty": "Ms. Soumya", "room": "SH1A", "type": "Lecture" },
        "Period 4": { "subject": "DAA", "faculty": "Dr. Suman", "room": "SH1A", "type": "Lecture" },
        "Period 5": { "subject": "OS", "faculty": "Dr. Palak Girdhar", "room": "SH1A", "type": "Lecture" },
        "Period 6": { "subject": "CN", "faculty": "Ms. Anju", "room": "SH1A", "type": "Lecture" },
        "Period 7": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" }
        },
        "Thursday": {
        "Period 1": { "subject": "DAA Lab (G2)", "faculty": "Dr. Suman", "room": "108A", "type": "Lab" },
        "Period 2": { "subject": "OS Lab (G1)", "faculty": "Dr. Palak Girdhar", "room": "108B", "type": "Lab" },
        "Period 3": { "subject": "EFE", "faculty": "Ms. Nishtha Batheja", "room": "SH1A", "type": "Lecture" },
        "Period 4": { "subject": "DAA", "faculty": "Dr. Suman", "room": "SH1A", "type": "Lecture" },
        "Period 5": { "subject": "CN", "faculty": "Ms. Anju", "room": "SH1A", "type": "Lecture" },
        "Period 6": { "subject": "CN", "faculty": "Ms. Anju", "room": "SH1A", "type": "Lecture" },
        "Period 7": { "subject": "Enrichment Activities", "faculty": "-", "room": "-", "type": "Activity" }
        },
        "Friday": {
        "Period 1": { "subject": "DAA", "faculty": "Dr. Suman", "room": "SH1A", "type": "Lecture" },
        "Period 2": { "subject": "SE", "faculty": "Ms. Soumya", "room": "SH1A", "type": "Lecture" },
        "Period 3": { "subject": "EFE", "faculty": "Ms. Nishtha Batheja", "room": "SH1A", "type": "Lecture" },
        "Period 4": { "subject": "CD", "faculty": "Dr. Shweta Taneja", "room": "SH1A", "type": "Lecture" },
        "Period 5": { "subject": "OS", "faculty": "Dr. Palak Girdhar", "room": "SH1A", "type": "Lecture" },
        "Period 6": { "subject": "CN", "faculty": "Ms. Anju", "room": "SH1A", "type": "Lecture" },
        "Period 7": { "subject": "PDP", "faculty": "Ms. Mehak Talwar", "room": "SH1A", "type": "Lecture" }
        }
    }
    },

};

// 🔹 Main Component
const TimetableExplorer: React.FC = () => {
  const [currentView, setCurrentView] = useState<"home" | "day" | "class">("home");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const Home = () => {
    const handleSubmit = () => {
      if (selectedBranch && selectedSemester) {
        setCurrentView("day");
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-2xl shadow-xl p-8 w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Timetable Explorer</h1>
            <p className="text-gray-600">Select your branch & semester</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <select
                onChange={(e) => setSelectedBranch(e.target.value)}
                value={selectedBranch}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select branch</option>
                <option value="CSE-A">CSE-A</option>
                <option value="CSE-B">CSE-B</option>
                <option value="CSE-C">CSE-C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select
                onChange={(e) => setSelectedSemester(e.target.value)}
                value={selectedSemester}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select semester</option>
                <option value="5th Sem">5th Semester</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedBranch || !selectedSemester}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50"
            >
              Show Today’s Timetable
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DayView = () => {
    const todayClasses =
      timetable[selectedBranch]?.[selectedSemester]?.[selectedDay] ?? {};
    const periods = Object.keys(todayClasses);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-8">
              <button
                onClick={() => setCurrentView("home")}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">
                  {selectedBranch} - {selectedSemester}
                </h1>
                <p className="text-gray-600">{selectedDay}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {periods.length === 0 ? (
                <p className="text-gray-500 text-center">No classes today 🎉</p>
              ) : (
                periods.map((period, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setCurrentView("class");
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{period}</span>
                      <span>{todayClasses[period].subject}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ClassDetails = () => {
    const cls =
      timetable[selectedBranch]?.[selectedSemester]?.[selectedDay]?.[
        selectedPeriod
      ];

    if (!cls) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-md mx-auto p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-8">
              <button
                onClick={() => setCurrentView("day")}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold">{cls.subject}</h1>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Period:</strong> {selectedPeriod}
              </li>
              <li>
                <strong>Faculty:</strong> {cls.faculty}
              </li>
              <li>
                <strong>Room:</strong> {cls.room}
              </li>
              <li>
                <strong>Type:</strong> {cls.type}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === "home" && <Home />}
      {currentView === "day" && <DayView />}
      {currentView === "class" && <ClassDetails />}
    </div>
  );
};

export default TimetableExplorer;
