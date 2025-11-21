// src/pages/WebDevGroup.tsx
export default function WebDevGroup() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold">Web Development Study Group</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Collaborate with peers, share your knowledge, and learn full-stack web
          development together.
        </p>
        <div className="mt-6 flex justify-center space-x-6 text-sm">
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full">
            Medium Priority
          </span>
          <span className="bg-white text-green-700 px-3 py-1 rounded-full">
            +25 Points
          </span>
          <span className="bg-white text-green-700 px-3 py-1 rounded-full">
            Duration: 50 mins
          </span>
          <span className="bg-white text-green-700 px-3 py-1 rounded-full">
            Location: Lab-3
          </span>
          <span className="bg-white text-green-700 px-3 py-1 rounded-full">
            👥 2 Students Joined
          </span>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">About this Group</h2>
        <p className="text-gray-700 leading-relaxed">
          The Web Development Study Group is an interactive session where
          students come together to learn and build projects collaboratively.
          You'll explore frontend, backend, and deployment practices while
          getting hands-on experience with modern tools.
        </p>
      </div>

      {/* Skills You’ll Gain */}
      <div className="bg-gray-100 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Skills You’ll Gain</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Build responsive frontends with React & Tailwind</li>
            <li>Understand REST APIs and backend basics</li>
            <li>Collaborative coding with Git & GitHub</li>
            <li>Deploy projects on Netlify, Vercel, or Heroku</li>
            <li>Work effectively in peer-learning groups</li>
          </ul>
        </div>
      </div>

      {/* Agenda */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">Agenda</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Session 1: HTML, CSS & Tailwind Basics</h3>
            <p className="text-gray-600 text-sm">
              Learn responsive layouts and utility-first design.
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Session 2: React Fundamentals</h3>
            <p className="text-gray-600 text-sm">
              Components, hooks, and props with hands-on examples.
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Session 3: Backend Basics</h3>
            <p className="text-gray-600 text-sm">
              Setting up a Node.js + Express API and connecting with MongoDB.
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Session 4: Project Collaboration</h3>
            <p className="text-gray-600 text-sm">
              Build a mini full-stack project as a group.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-10">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
          Join Group 🤝
        </button>
      </div>
    </div>
  );
}
