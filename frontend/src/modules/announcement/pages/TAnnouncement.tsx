import { useEffect, useState } from "react";
import {
  createAnnouncement,
  getTeacherAnnouncements,
} from "@/modules/announcement/api/announcement-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Announcement {
  _id: string;
  title: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

const TAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = localStorage.getItem("email"); // ✅ teacher email from localStorage

  // Fetch teacher's announcements
  const fetchAnnouncements = async () => {
    if (!email) return;
    try {
      setLoading(true);
      const res = await getTeacherAnnouncements(email);
      setAnnouncements(res.data.announcements || []);
    } catch (err: any) {
      console.error("❌ Error fetching teacher announcements:", err);
      setError("Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  // Create new announcement
  const handleCreate = async () => {
    if (!title.trim() || !message.trim() || !email) return;

    try {
      setLoading(true);
      await createAnnouncement({ title, message, createdBy: email });
      setTitle("");
      setMessage("");
      await fetchAnnouncements();
    } catch (err: any) {
      console.error("❌ Error creating announcement:", err);
      setError("Failed to create announcement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📢 Manage Announcements</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Posting..." : "Post Announcement"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Announcements ({announcements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <p className="text-gray-500">No announcements created yet.</p>
          ) : (
            <ul className="space-y-2">
              {announcements.map((a) => (
                <li
                  key={a._id}
                  className="border p-3 rounded-md shadow-sm bg-gray-50"
                >
                  <h2 className="font-semibold">{a.title}</h2>
                  <p className="text-gray-700">{a.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TAnnouncement;
