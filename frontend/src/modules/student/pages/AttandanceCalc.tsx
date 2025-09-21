import { useState } from "react";

const AttendanceCalc = () => {
  const [totalLectures, setTotalLectures] = useState<number>(0);
  const [lecturesHeld, setLecturesHeld] = useState<number>(0);
  const [attendedLectures, setAttendedLectures] = useState<number>(0);
  const [targetPercentage, setTargetPercentage] = useState<number>(75);

  const [result, setResult] = useState<string>("");

  const calculateAttendance = () => {
    if (
      totalLectures <= 0 ||
      lecturesHeld < 0 ||
      attendedLectures < 0 ||
      attendedLectures > lecturesHeld ||
      targetPercentage <= 0
    ) {
      setResult("⚠️ Enter valid numbers in all fields.");
      return;
    }

    const percentHeld = (attendedLectures / lecturesHeld) * 100;
    const percentTotal = (attendedLectures / totalLectures) * 100;
    const remainingLectures = totalLectures - lecturesHeld; // ✅ Corrected

    // Total lectures needed to reach target % out of total planned lectures
    const totalNeededToAttend = Math.ceil((targetPercentage / 100) * totalLectures);
    const remainingToAttend = totalNeededToAttend - attendedLectures;

    let output = `📊 Attendance % (of lectures held): ${percentHeld.toFixed(2)}%\n`;
    output += `📊 Attendance % (of total planned lectures): ${percentTotal.toFixed(2)}%\n`;

    if (percentTotal >= targetPercentage) {
      output += `✅ You already meet the target of ${targetPercentage}%`;
    } else if (remainingToAttend > remainingLectures) {
      output += `\n❌ Even if you attend all remaining ${remainingLectures} lectures, you cannot reach ${targetPercentage}% target.`;
    } else {
      output += `\n📌 You need to attend at least ${remainingToAttend} out of ${remainingLectures} remaining lectures to reach ${targetPercentage}% target.`;
    }

    setResult(output);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          🎓 Attendance Calculator
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block font-medium">Total Lectures Planned</label>
            <input
              type="number"
              value={totalLectures}
              onChange={(e) => setTotalLectures(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter total lectures planned"
            />
          </div>

          <div>
            <label className="block font-medium">Lectures Held So Far</label>
            <input
              type="number"
              value={lecturesHeld}
              onChange={(e) => setLecturesHeld(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter lectures held so far"
            />
          </div>

          <div>
            <label className="block font-medium">Lectures Attended</label>
            <input
              type="number"
              value={attendedLectures}
              onChange={(e) => setAttendedLectures(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter lectures you attended"
            />
          </div>

          <div>
            <label className="block font-medium">Target Attendance (%)</label>
            <input
              type="number"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter target % (e.g. 75)"
            />
          </div>

          <button
            onClick={calculateAttendance}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-gray-800 whitespace-pre-line">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCalc;
