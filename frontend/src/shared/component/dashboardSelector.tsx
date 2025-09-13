import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DashboardSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 relative overflow-hidden">
      {/* Background floating blur circles for creativity */}
      <div className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="w-[420px] rounded-3xl shadow-2xl bg-gray-900 border border-gray-700/60 hover:border-purple-500/50 transition-colors duration-300">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Select one option
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl text-lg py-6 shadow-lg hover:shadow-purple-600/30 transition-all"
              size="lg"
              onClick={() => navigate("/login")}
            >
              🎓 Login as Student
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-lg py-6 shadow-lg hover:shadow-blue-600/30 transition-all"
              size="lg"
              onClick={() => navigate("/teacher-login")}
            >
              👨‍🏫 Login as Teacher
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardSelector;
