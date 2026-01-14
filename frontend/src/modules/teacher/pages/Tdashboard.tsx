import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  User,
  Users,
  ClipboardList,
  Megaphone,
  Eye,
} from "lucide-react";

const TDashboard = () => {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    if (!storedEmail) {
      navigate("/tlogin");
      return; // ✅ important: return void, not navigate()
    }

    setEmail(storedEmail);

    fetch(
      `http://localhost:9999/api/v1/teacher/profile?email=${storedEmail}`
    )
      .then((res) => res.json())
      .then(setProfile)
      .catch(console.error);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/selector");
  };

  const dashboardCards = [
    {
      title: "Profile",
      description: "View and update your profile",
      path: "/tprofile",
      group: "General",
      icon: <User size={20} />,
    },
    {
      title: "All Students",
      description: "View enrolled students",
      path: "/tstudents",
      group: "Academic",
      icon: <Users size={20} />,
    },
    {
      title: "Mark Attendance",
      description: "Mark daily attendance",
      path: "/tattendance",
      group: "Academic",
      icon: <ClipboardList size={20} />,
    },
    {
      title: "Post Announcement",
      description: "Create announcements",
      path: "/Tannouncement",
      group: "Communication",
      icon: <Megaphone size={20} />,
    },
    {
      title: "View Attendance",
      description: "Check student attendance",
      path: "/tview",
      group: "Academic",
      icon: <Eye size={20} />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#F4F8FF]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col rounded-r-3xl p-6">
        <div className="mb-10">
          <h2 className="text-2xl font-bold">Teacher Portal</h2>
          <p className="text-sm opacity-80">TEACHER</p>
          <p className="text-xs opacity-70 mt-1">{email}</p>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarButton
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <SidebarButton
            icon={<User size={18} />}
            label="Profile"
            onClick={() => navigate("/tprofile")}
          />
          <SidebarButton
            icon={<Users size={18} />}
            label="Students"
            onClick={() => navigate("/tstudents")}
          />
          <SidebarButton
            icon={<ClipboardList size={18} />}
            label="Attendance"
            onClick={() => navigate("/tattendance")}
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
      <main className="flex-1 p-8 space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome 👋 {profile?.name}
          </h1>
          <p className="text-gray-500 text-sm">
            Logged in as {email}
          </p>
        </div>

        {/* HERO */}
        <div className="bg-blue-600 text-white rounded-3xl p-6">
          <p className="text-sm opacity-80">Teacher Dashboard</p>
          <h2 className="text-3xl font-bold mt-2">
            Manage classes and students efficiently 📘
          </h2>
        </div>

        {/* FEATURE CARDS */}
        {["General", "Academic", "Communication"].map((group) => (
          <section key={group}>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {group}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardCards
                .filter((card) => card.group === group)
                .map((card) => (
                  <Card
                    key={card.title}
                    className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
                    onClick={() => navigate(card.path)}
                  >
                    <CardContent className="p-5 space-y-2">
                      <div className="text-blue-600">
                        {card.icon}
                      </div>
                      <h4 className="font-semibold text-gray-800">
                        {card.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {card.description}
                      </p>
                      <Button className="mt-3 bg-blue-600 hover:bg-blue-700">
                        Open
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default TDashboard;

/* ---------------- Sidebar Button ---------------- */

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
