// src/pages/Smart.tsx
import { useNavigate } from "react-router-dom";

const Smart = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: "coding-challenge",
      title: "Data Structures Coding Challenge",
      description: "Practice tree traversal problems - matches your upcoming exam",
      duration: "45 minutes",
      location: "Computer Lab or Online",
      points: "+30 points",
      priority: "High",
    },
    {
      id: "group-web",
      title: "Join Web Development Study Group",
      description: "2 students already studying. Share knowledge!",
      duration: "50 minutes",
      location: "Lab-3",
      points: "+25 points",
      extra: "2 students joined",
      priority: "Medium",
    },
    {
      id: "career-skill",
      title: "System Design Fundamentals",
      description: "Build skills for tech interviews and real-world projects",
      duration: "40 minutes",
      location: "Online Course/Library",
      points: "+35 points",
      priority: "Medium",
    },
  ];

  const handleAcceptRecommendation = (recId: string) => {
    if (recId === "coding-challenge") {
      navigate("/data-structures");
    } else if (recId === "group-web") {
      navigate("/web-dev-group");
    } else if (recId === "career-skill") {
      navigate("/system-design");
    } else {
      alert("This activity will be added soon!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-gray-200">
          <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">
            All Recommendations (5)
          </button>
          <button className="pb-2 text-gray-500 hover:text-gray-700">
            Study Sessions (2)
          </button>
          <button className="pb-2 text-gray-500 hover:text-gray-700">
            Skill Building (1)
          </button>
          <button className="pb-2 text-gray-500 hover:text-gray-700">
            Group Activities (1)
          </button>
          <button className="pb-2 text-gray-500 hover:text-gray-700">
            Career Prep (1)
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between border hover:shadow-lg transition-shadow"
            >
              {/* Priority Label */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold">{rec.title}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    rec.priority === "High"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {rec.priority}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{rec.description}</p>

              {/* Meta info */}
              <div className="text-sm text-gray-500 mb-4 space-y-1">
                <p>⏱ {rec.duration}</p>
                <p>📍 {rec.location}</p>
                {rec.extra && <p>👥 {rec.extra}</p>}
              </div>

              {/* Points */}
              <p className="text-orange-500 text-sm font-medium mb-4">
                ⭐ {rec.points}
              </p>

              {/* Button */}
              <button
                onClick={() => handleAcceptRecommendation(rec.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Start Activity
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Smart;
