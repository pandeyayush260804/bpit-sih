import { useEffect, useState } from "react";
import { getAllAnnouncements } from "@/modules/announcement/api/announcement-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Announcement {
  _id: string;
  title: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

const SAnnouncement = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllAnnouncements()
      .then((res) => {
        // Handle both array directly or { announcements: [...] } structure
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.announcements || [];
        console.log("Announcements fetched:", data);
        setAnnouncements(data);
      })
      .catch((err) => {
        console.error("❌ Error fetching announcements:", err);
        setError("Failed to load announcements.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading announcements...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📢 Announcements</h1>

      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements available.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <Card key={a._id}>
              <CardHeader>
                <CardTitle>{a.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  By {a.createdBy || "Unknown"} •{" "}
                  {a.createdAt
                    ? new Date(a.createdAt).toLocaleDateString()
                    : "No date"}
                </p>
              </CardHeader>
              <CardContent>
                <p>{a.message || "No message"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SAnnouncement;
