// src/pages/DataStructures.tsx
import { useNavigate } from "react-router-dom";

export default function DataStructures() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold">Data Structures Coding Challenge</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Practice tree traversal problems, sharpen your problem-solving skills,
          and get ready for exams & coding interviews.
        </p>
        <div className="mt-6 flex justify-center space-x-6 text-sm">
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full">
            High Priority
          </span>
          <span className="bg-white text-blue-700 px-3 py-1 rounded-full">
            +30 Points
          </span>
          <span className="bg-white text-blue-700 px-3 py-1 rounded-full">
            Duration: 45 mins
          </span>
          <span className="bg-white text-blue-700 px-3 py-1 rounded-full">
            Mode: Online / Lab
          </span>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">About this Challenge</h2>
        <p className="text-gray-700 leading-relaxed">
          The Data Structures Coding Challenge is designed to strengthen your
          fundamentals in tree traversal algorithms, recursion, and complexity
          analysis. You will solve problems that mimic real exam questions and
          coding interview scenarios, ensuring hands-on mastery of the concepts.
        </p>
      </div>

      {/* What You’ll Learn */}
      <div className="bg-gray-100 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">What You’ll Learn</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Master binary tree traversals (inorder, preorder, postorder)</li>
            <li>Understand recursion and iterative approaches</li>
            <li>Analyze time and space complexity</li>
            <li>Practice exam-style coding challenges</li>
            <li>Improve problem-solving speed and accuracy</li>
          </ul>
        </div>
      </div>

      {/* Course Syllabus */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">Course Syllabus</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Module 1: Introduction to Trees</h3>
            <p className="text-gray-600 text-sm">
              Basics of tree data structures, binary vs n-ary trees, terminology.
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Module 2: Tree Traversal Techniques</h3>
            <p className="text-gray-600 text-sm">
              Inorder, Preorder, Postorder traversals with examples & code.
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Module 3: Advanced Problems</h3>
            <p className="text-gray-600 text-sm">
              Level-order traversal, boundary traversal, and tricky interview
              questions.
            </p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <h3 className="font-semibold">Module 4: Practice Challenge</h3>
            <p className="text-gray-600 text-sm">
              Solve timed challenges to reinforce your learning.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-10">
        <button
          onClick={() => navigate("/blank")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Challenge 🚀
        </button>
      </div>
    </div>
  );
}
