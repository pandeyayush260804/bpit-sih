import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, LogOut, LayoutDashboard, Bell, HelpCircle } from "lucide-react";
import DarkVeli from "@/components/DarkVeil.tsx";

const Sdashboard = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "student";
    const storedEmail = localStorage.getItem("email");

    if (!storedEmail) {
      console.error("Email not found in localStorage");
      setError("No logged-in user found.");
      setLoading(false);
      return;
    }

    setRole(storedRole);
    setEmail(storedEmail);

    fetch(`http://localhost:9999/api/v1/student/profile?email=${storedEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Profile not found (status: ${res.status})`);
        return res.json();
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/selector");
  };

  // Dashboard cards with descriptions
  const dashboardCards = [
    {
      title: "Result Checker",
      description: "Check your latest exam results and grades easily.",
      path: "/checkresult",
    },
    {
      title: "Syllabus Explorer",
      description: "Browse detailed syllabus for all your subjects.",
      path: "/SExplorer",
    },
    {
      title: "Time Table",
      description: "View your daily and weekly schedule at a glance.",
      path: "/STimeTable",
    },
    {
      title: "Attendance Calculator",
      description: "Calculate and analyze your attendance percentage.",
      path: "/attendance",
    },
    {
      title: "My Attendance",
      description: "Track your attendance record per subject.",
      path: "/sattendance",
    },
    {
      title: "Smart Features",
      description: "Access AI-powered tools to improve learning.",
      path: "/studybuddy",
    },
    {
      title: "Announcements",
      description: "Stay updated with latest notices and news.",
      path: "/Sannouncement",
    },
    {
      title: "Skill-building Activities",
      description: "Engage in exercises to enhance your skills.",
      path: "/Smart",
    },
    {
      title: "To Do",
      description: "Manage your daily tasks and assignments.",
      path: "/SmartToDoApp",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* DarkVeli Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeli />
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-md shadow-lg flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-purple-600">Student Portal</h2>
            <p className="text-sm text-gray-500">{role.toUpperCase()}</p>
          </div>
          <nav className="flex-1 p-4 space-y-3">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/profile")}
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/Smart")}
            >
              <BookOpen className="h-4 w-4" />
              My Courses
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/help")}
            >
              <HelpCircle className="h-4 w-4" />
              Help Center
            </Button>
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="destructive"
              className="w-full flex gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          <header>
            <h1 className="text-2xl font-semibold text-white">Welcome back 👋</h1>
            <p className="text-gray-500">Logged in as {email}</p>
          </header>

          {loading ? (
            <p>Loading profile...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : profile ? (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardCards.map((card) => (
                <Card
                  key={card.title}
                  className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md hover:shadow-lg transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-gray-800">{card.title}</CardTitle>
                    <p className="text-gray-500 text-sm mt-1">{card.description}</p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => navigate(card.path)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Open
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </section>
          ) : (
            <p>No profile data available.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Sdashboard;
