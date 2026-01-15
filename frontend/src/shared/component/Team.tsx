// src/pages/Team.tsx
import { useEffect, useState } from "react";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

const TEAM_MEMBERS = [
  "pandeyayush260804",
  "mehaksuri1511",
  "Gauravsingh640",
];

export default function Team(){
  const [members, setMembers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const responses = await Promise.all(
          TEAM_MEMBERS.map((username) =>
            fetch(`https://api.github.com/users/${username}`).then((res) =>
              res.json()
            )
          )
        );
        setMembers(responses);
      } catch (error) {
        console.error("Error fetching GitHub profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        Loading team profiles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black px-6 py-14">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h1 className="text-4xl font-bold text-white">
          Meet the Team 👥
        </h1>
        <p className="mt-4 text-gray-400">
          The developers behind this project, building with passion and precision.
        </p>
      </div>

      {/* TEAM GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {members.map((user) => (
          <div
            key={user.login}
            className="
              bg-gradient-to-br from-blue-900/40 to-blue-800/20
              border border-blue-500/20
              rounded-2xl
              p-6
              text-center
              shadow-lg
              hover:shadow-blue-500/20
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="
                w-28 h-28 rounded-full mx-auto mb-4
                border-2 border-blue-500/40
              "
            />

            <h2 className="text-xl font-semibold text-white">
              {user.name || user.login}
            </h2>

            <p className="text-blue-300 text-sm">
              @{user.login}
            </p>

            {user.bio && (
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                {user.bio}
              </p>
            )}

            {/* STATS */}
            <div className="flex justify-center gap-6 mt-5 text-sm text-gray-300">
              <span>
                <strong className="text-white">{user.public_repos}</strong>{" "}
                Repos
              </span>
              <span>
                <strong className="text-white">{user.followers}</strong>{" "}
                Followers
              </span>
            </div>

            {/* LINK */}
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="
                inline-block mt-6
                text-blue-400 font-medium
                hover:text-blue-300
                transition
              "
            >
              View GitHub →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
