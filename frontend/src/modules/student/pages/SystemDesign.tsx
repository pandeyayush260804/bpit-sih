// src/pages/SystemDesign.tsx
export default function SystemDesign() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-purple-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold">System Design Fundamentals</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Build the core system design skills needed for technical interviews
          and real-world projects.
        </p>
        <div className="mt-6 flex justify-center space-x-6 text-sm">
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full">
            Medium Priority
          </span>
          <span className="bg-white text-purple-700 px-3 py-1 rounded-full">
            +35 Points
          </span>
          <span className="bg-white text-purple-700 px-3 py-1 rounded-full">
            Duration: 40 mins
          </span>
          <span className="bg-white text-purple-700 px-3 py-1 rounded-full">
            Mode: Online / Library
          </span>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">About this Course</h2>
        <p className="text-gray-700 leading-relaxed">
          This course introduces the foundations of system design, covering key
          concepts such as scalability, reliability, fault tolerance, and
          trade-offs in distributed systems. Ideal for students preparing for
          placements or those who want to architect real-world solutions.
        </p>
      </div>

      {/* What You’ll Learn */}
      <div className="bg-gray-100 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">What You’ll Learn</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Core principles of scalable system design</li>
            <li>Designing high-availability and fault-tolerant systems</li>
            <li>Load balancing, caching, and database sharding</li>
            <li>Real-world case studies from top tech companies</li>
            <li>Preparation for FAANG-level system design interviews</li>
          </ul>
        </div>
      </div>

      {/* Course Modules */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Module 1: Introduction to System Design</h3>
            <p className="text-gray-600 text-sm">
              Basics of scalability, reliability, and performance.
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Module 2: Caching & Load Balancing</h3>
            <p className="text-gray-600 text-sm">
              Learn caching strategies and load balancing techniques.
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Module 3: Database Scaling</h3>
            <p className="text-gray-600 text-sm">
              Replication, sharding, and consistency trade-offs.
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Module 4: Case Studies</h3>
            <p className="text-gray-600 text-sm">
              Design a URL shortener, chat app, and scalable file storage.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-10">
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
          Start Learning 🚀
        </button>
      </div>
    </div>
  );
}
