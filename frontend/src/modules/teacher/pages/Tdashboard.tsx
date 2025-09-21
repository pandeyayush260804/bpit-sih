import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  User,
  Users,
  ClipboardList,
} from "lucide-react";
import DarkVeli from "@/components/DarkVeil.tsx"; // 🌌 DarkVeli bg

const TDashboard = () => {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const storedEmail = localStorage.getItem("email");
      if (!storedEmail) return navigate("/tlogin");
      setEmail(storedEmail);

      try {
        const res = await fetch(
          `http://localhost:9999/api/v1/teacher/profile?email=${storedEmail}`
        );
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/tlogin");
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
            <h2 className="text-xl font-bold text-purple-600">Teacher Portal</h2>
            <p className="text-sm text-gray-500">TEACHER</p>
            <p className="text-xs text-gray-400 mt-1">{email}</p>
          </div>
          <nav className="flex-1 p-4 space-y-3">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/tprofile")}
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/tstudents")}
            >
              <Users className="h-4 w-4" />
              Students
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/tattendance")}
            >
              <ClipboardList className="h-4 w-4" />
              Attendance
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
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome back 👋 {profile?.name}
            </h1>
            <p className="text-gray-500">Logged in as {email}</p>
          </header>

          {/* Teacher Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
              <CardHeader>
                <CardTitle>All Students</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate("/tstudents")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Students
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
              <CardHeader>
                <CardTitle>Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate("/tattendance")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Mark Attendance
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate("/tprofile")}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-md">
              <CardHeader>
                <CardTitle>Announcement</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate("/Tannouncement")}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Go to Announcements
                </Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TDashboard;
