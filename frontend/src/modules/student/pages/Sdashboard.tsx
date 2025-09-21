import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, LogOut, LayoutDashboard } from "lucide-react";
import DarkVeli from "@/components/DarkVeil.tsx"; // ⚡ use DarkVeli instead of Lightning

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
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 🌌 DarkVeli Background */}
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
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BookOpen className="h-4 w-4" />
              My Courses
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
        <main className="flex-1 p-6 space-y-6 ">
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
              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
                <CardHeader>
                  <CardTitle>Result Checker</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => navigate("/checkresult")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Go to Checker
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
                <CardHeader>
                  <CardTitle>Syllabus Explorer</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => navigate("/SExplorer")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Go to Syllabus
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
                <CardHeader>
                  <CardTitle>Time Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => navigate("/STimeTable")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Time Table
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
                <CardHeader>
                  <CardTitle>Attendance Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => navigate("/attendance")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Open Calculator
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
                <CardHeader>
                  <CardTitle>My Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => navigate("/sattendance")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Attendance
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
                <CardHeader>
                  <CardTitle>Smart Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => navigate("/studybuddy")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Ask SmartBot
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => navigate("/Sannouncement")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Announcements
                  </Button>
                </CardContent>
              </Card>
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
