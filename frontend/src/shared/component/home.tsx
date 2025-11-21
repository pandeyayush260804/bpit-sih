// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import logo from "@/assets/logo.png";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Animated gradient background */}
//       <motion.div
//         className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
//         animate={{
//           background: [
//             "linear-gradient(to bottom right, #eef2ff, #f5f3ff, #fff1f2)",
//             "linear-gradient(to bottom right, #f0f9ff, #ede9fe, #ffe4e6)",
//             "linear-gradient(to bottom right, #eef2ff, #f5f3ff, #fff1f2)",
//           ],
//         }}
//         transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
//       />

//       {/* Content */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10 bg-white shadow-2xl border border-gray-200 rounded-2xl p-12 w-[420px] text-center"
//       >
//         {/* Logo */}
//         <motion.img
//           src={logo}
//           alt="CampusConnect Logo"
//           className="mx-auto w-40 h-24 mb-8 object-contain"
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//         />

//         {/* Heading */}
//         <h1 className="text-3xl font-bold mb-4 text-gray-900">
//           Welcome to <br />
//           <span className="text-indigo-700">CampusConnect</span>
//         </h1>

//         {/* Tagline with typing effect */}
//         <p className="text-gray-600 mb-8 text-base leading-relaxed">
//           <span className="border-r-2 border-indigo-600 pr-1 animate-typing whitespace-nowrap overflow-hidden">
//             Empowering your campus journey.
//           </span>
//         </p>

//         {/* Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/selector")}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-xl transition duration-300"
//         >
//           Get Started
//         </motion.button>
//       </motion.div>

//       {/* Typing effect CSS */}
//       <style>{`
//         .animate-typing {
//           display: inline-block;
//           animation: typing 3s steps(30, end), blink 0.75s step-end infinite;
//         }
//         @keyframes typing {
//           from { width: 0 }
//           to { width: 100% }
//         }
//         @keyframes blink {
//           50% { border-color: transparent }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png"; // Use your CampusConnect logo
import bgImage from "@/assets/bg-image.webp";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-800 to-black text-white overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgImage})` }}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Navbar */}
      <div className="relative z-20 flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="CampusConnect Logo" className="h-8 w-8 object-contain" />
          <span className="text-xl font-bold">CampusConnect</span>
        </div>
        
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="CampusConnect Logo"
          className="w-32 h-20 mb-6 object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Welcome to <span className="text-indigo-400">CampusConnect</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-300 text-lg">
          Empowering your campus journey.
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/selector")}
          className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-lg shadow-lg"
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
