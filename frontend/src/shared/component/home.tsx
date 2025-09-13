import { useNavigate } from "react-router-dom";
import Galaxy from '@/components/Galaxy';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black">
      {/* Galaxy Background */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-[420px] text-center transform transition duration-500 hover:scale-105 hover:shadow-3xl">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900 drop-shadow-sm">
            Welcome 🚀
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            Join us and start your journey today.
          </p>

          <button
            onClick={() => navigate("/selector")}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:opacity-90 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
