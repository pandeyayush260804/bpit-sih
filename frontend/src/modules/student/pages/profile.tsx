import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DarkVeil from "@/components/DarkVeil";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("No email found in localStorage");
      return;
    }

    fetch(`https://bpit-sih.onrender.com/api/v1/student/profile?email=${email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Profile not found");
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => console.error("Failed to fetch profile:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white relative">
        <div className="absolute inset-0 z-0">
          <DarkVeil />
        </div>
        <p className="text-xl animate-pulse z-10 relative">Loading profile...</p>
      </div>
    );

  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white relative">
        <div className="absolute inset-0 z-0">
          <DarkVeil />
        </div>
        <p className="text-xl text-red-300 z-10 relative">
          Profile data not available. Please try again later.
        </p>
      </div>
    );

  const profileItems = [
    { label: "Name", value: profile.name },
    { label: "Email", value: profile.email },
    { label: "Branch", value: profile.branch },
    { label: "Class", value: profile.class },
    { label: "Roll No", value: profile.rollNo },
    { label: "Year", value: profile.year },
    { label: "Role", value: profile.role },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      <Card className="relative z-10 w-full max-w-lg shadow-2xl rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-500 transform transition-transform duration-700 ease-out scale-95 hover:scale-100 hover:shadow-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-white text-center">
            My Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Circular Profile Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-5xl font-bold">
              {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-5">
            {profileItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between p-4 bg-white bg-opacity-90 rounded shadow-sm cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="font-medium text-gray-700 hover:text-indigo-900 transition-colors duration-300">
                  {item.label}:
                </span>
                <span className="text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
