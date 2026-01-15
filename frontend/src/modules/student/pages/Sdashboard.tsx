import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  BookOpen,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      setError("No logged-in user found.");
      setLoading(false);
      return;
    }

    setRole(storedRole);
    setEmail(storedEmail);

    fetch(`https://bpit-sih.onrender.com/api/v1/student/profile?email=${storedEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error("Profile not found");
        return res.json();
      })
      .then(setProfile)
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/selector");
  };

  const dashboardCards = [
    
    {
      title: "Syllabus Explorer",
      description: "Browse detailed syllabus",
      path: "/SExplorer",
      group: "Academic",
    },
    {
      title: "Time Table",
      description: "View your class schedule",
      path: "/STimeTable",
      group: "Academic",
    },
    {
      title: "Attendance Calculator",
      description: "Calculate attendance percentage",
      path: "/attendance",
      group: "Attendance",
    },
    {
      title: "My Attendance",
      description: "Track subject-wise attendance",
      path: "/sattendance",
      group: "Attendance",
    },
    {
      title: "Smart Features",
      description: "AI-powered learning tools",
      path: "/studybuddy",
      group: "Smart",
    },
    {
      title: "Announcements",
      description: "Latest notices & updates",
      path: "/Sannouncement",
      group: "Updates",
    },
    {
      title: "Skill-building Activities",
      description: "Improve skills interactively",
      path: "/Smart",
      group: "Smart",
    },
    {
      title: "To Do",
      description: "Manage daily tasks",
      path: "/SmartToDoApp",
      group: "Productivity",
    },
  ];

  if (loading)
    return <p className="p-6 text-gray-800">Loading...</p>;
  if (error)
    return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/light-purple-aesthetic-celestial-bodies-53xyo8km87n6n4ne.jpg')",
      }}
    >
      {/* Optional overlay for readability */}
      <div className="min-h-screen bg-white/10 backdrop-blur-sm">
        <div className="flex min-h-screen">
          {/* SIDEBAR */}
          <aside className="w-64 bg-purple-700/90 text-white flex flex-col rounded-r-3xl p-6 backdrop-blur">
            <div className="mb-10">
              <h2 className="text-2xl font-bold">Student Portal</h2>
              <p className="text-sm opacity-80">{role.toUpperCase()}</p>
            </div>

            <nav className="flex-1 space-y-2">
              <SidebarButton
                icon={<LayoutDashboard size={18} />}
                label="Dashboard"
              />
              <SidebarButton
                icon={<User size={18} />}
                label="Profile"
                onClick={() => navigate("/profile")}
              />
              <SidebarButton
                icon={<BookOpen size={18} />}
                label="My Courses"
                onClick={() => navigate("/Smart")}
              />
              <SidebarButton
                icon={<Bell size={18} />}
                label="Notifications"
                onClick={() => navigate("/notifications")}
              />
              <SidebarButton
                icon={<HelpCircle size={18} />}
                label="Help Center"
                onClick={() => navigate("/help")}
              />
            </nav>

            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 mt-6"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 p-8 space-y-8 text-gray-900">
            {/* TOP BAR */}
            <div className="flex justify-between items-center">
              <input
                placeholder="Search"
                className="w-80 px-4 py-2 rounded-xl border outline-none"
              />
              <div className="text-right">
                <p className="font-semibold">{email}</p>
                <p className="text-sm text-gray-700">Student</p>
              </div>
            </div>

            {/* HERO */}
            <div className="bg-purple-500/80 text-white rounded-3xl p-6 backdrop-blur">
              <p className="text-sm opacity-80">Welcome back</p>
              <h1 className="text-3xl font-bold mt-2">
                Stay on track with your academics 🎓
              </h1>
            </div>

            {/* CARD GROUPS */}
            {["Academic", "Attendance", "Smart", "Updates", "Productivity"].map(
              (group) => (
                <section key={group}>
                  <h2 className="text-xl font-semibold mb-4">{group}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dashboardCards
                      .filter((c) => c.group === group)
                      .map((card) => (
                        <Card
                          key={card.title}
                          className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
                          onClick={() => navigate(card.path)}
                        >
                          <CardContent className="p-5">
                            <h3 className="font-semibold">
                              {card.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {card.description}
                            </p>
                            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                              Open
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </section>
              )
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Sdashboard;

/* ------------------ SIDEBAR BUTTON ------------------ */

const SidebarButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full px-4 py-2 rounded-xl hover:bg-white/20 transition"
  >
    {icon}
    {label}
  </button>
);
