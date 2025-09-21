
// src/pages/StudyBuddy.tsx
import { useNavigate } from "react-router-dom";

const StudyBuddy = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Back Button */}
      <div className="p-4 bg-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Back
        </button>
      </div>

      {/* Chatbot iframe */}
      {/* Make this container flex-col so its children can use flex-1 */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Use flex-1 to fill the remaining space instead of h-full */}
        <div className="flex-1 w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/RJHVmuUzKkT58L3Ty3FyT"
            width="100%"
            style={{ height: '100%', minHeight: '700px' }}
            frameBorder="0"
        ></iframe>
        </div>
      </div>
    </div>
  );
};

export default StudyBuddy;
