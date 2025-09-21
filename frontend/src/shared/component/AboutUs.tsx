import { useState } from "react";

const AboutUs = () => {
  const [activePage, setActivePage] = useState("about");

  return (
    <div>
      {/* Navbar */}
      <nav className="flex gap-5 p-3 bg-gray-100 justify-center">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activePage === "about"
              ? "bg-indigo-600 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActivePage("about")}
        >
          About Us
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activePage === "features"
              ? "bg-indigo-600 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActivePage("features")}
        >
          Features
        </button>
      </nav>

      {/* Pages */}
      <div>
        {activePage === "about" && (
          <section className="p-12 text-center bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-6 text-indigo-600">
              🌟 About Us
            </h1>
            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
              Hey there 👋! Welcome to <strong>CampusConnect</strong> – the
              ultimate <b>college life hack</b> you didn’t know you needed. We're
              here to make your day less stressful and more ✨ productive + fun ✨
              with a mix of AI magic, peer vibes, and smart planning.
            </p>

            {/* Cards */}
            <div className="flex justify-center gap-6 flex-wrap my-10">
              <div className="bg-white rounded-2xl p-6 w-56 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <h3 className="text-2xl">🚀</h3>
                <h4 className="text-indigo-600 mt-2 font-semibold">Our Vibe</h4>
                <p className="text-gray-600 text-sm mt-2">
                  We’re all about work-smart-not-hard: AI study buddy, chill
                  breaks, and peer collab squads.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 w-56 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <h3 className="text-2xl">🎯</h3>
                <h4 className="text-indigo-600 mt-2 font-semibold">Our Mission</h4>
                <p className="text-gray-600 text-sm mt-2">
                  No more missed deadlines or FOMO — we help you stay balanced,
                  motivated, and on top of your game.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 w-56 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <h3 className="text-2xl">💡</h3>
                <h4 className="text-indigo-600 mt-2 font-semibold">
                  Our Secret Sauce
                </h4>
                <p className="text-gray-600 text-sm mt-2">
                  AI + Mood Tracking + College Events = a smarter way to spend
                  free time 🚀.
                </p>
              </div>
            </div>

            <p className="mt-8 text-lg font-medium text-gray-900">
              ✨{" "}
              <em>
                Join us on this journey and turn your “college chaos” into a
                “college glow-up.”
              </em>{" "}
              💜
            </p>

            <p className="text-3xl animate-bounce mt-6">🔥📚💻🎉</p>
          </section>
        )}

        {activePage === "features" && (
          <div className="p-12 text-center min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">
              🚀 Smart Features
            </h2>
            <div className="flex justify-center items-center text-gray-500 italic">
              Coming soon...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
