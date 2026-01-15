// // src/pages/Blank.tsx
// export default function Blank() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HERO SECTION */}
//       <div className="bg-blue-600 text-white py-12 px-6 text-center">
//         <h1 className="text-4xl font-bold">
//           Activity Overview
//         </h1>

//         <p className="mt-4 text-lg max-w-2xl mx-auto">
//           This page will display grouped data and tasks in an organized,
//           interactive way.
//         </p>

//         <div className="mt-6 flex justify-center flex-wrap gap-4 text-sm">
//           <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full">
//             Priority: Medium
//           </span>
//           <span className="bg-white text-blue-700 px-3 py-1 rounded-full">
//             Dynamic Content
//           </span>
//           <span className="bg-white text-blue-700 px-3 py-1 rounded-full">
//             Mode: Interactive
//           </span>
//         </div>
//       </div>

//       {/* ABOUT SECTION */}
//       <div className="max-w-5xl mx-auto px-6 py-10">
//         <h2 className="text-2xl font-bold mb-4">
//           About this Section
//         </h2>
//         <p className="text-gray-700 leading-relaxed">
//           This page acts as a flexible container to display different
//           groups and their related tasks or activities. Data can later
//           be injected from forms, APIs, or internal logic.
//         </p>
//       </div>

//       {/* GROUPS SECTION */}
//       <div className="bg-gray-100 py-10 px-6">
//         <div className="max-w-5xl mx-auto space-y-6">
//           <h2 className="text-2xl font-bold mb-4">
//             Groups
//           </h2>

//           {/* GROUP CARD */}
//           <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
//             <h3 className="text-lg font-semibold">
//               Group 1: Core Activities
//             </h3>
//             <p className="text-gray-600 text-sm mt-1">
//               Tasks related to main objectives will appear here.
//             </p>

//             <div className="mt-4 space-y-2">
//               <div className="p-3 border rounded-lg bg-gray-50">
//                 Task placeholder 1
//               </div>
//               <div className="p-3 border rounded-lg bg-gray-50">
//                 Task placeholder 2
//               </div>
//             </div>
//           </div>

//           {/* GROUP CARD */}
//           <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
//             <h3 className="text-lg font-semibold">
//               Group 2: Secondary Activities
//             </h3>
//             <p className="text-gray-600 text-sm mt-1">
//               Additional or optional tasks will be listed here.
//             </p>

//             <div className="mt-4 space-y-2">
//               <div className="p-3 border rounded-lg bg-gray-50">
//                 Task placeholder A
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA */}
//       <div className="text-center py-12">
//         <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
//           Add New Task / Group
//         </button>
//       </div>
//     </div>
//   );
// }
// src/pages/Blank.tsx
export default function Blank() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center bg-white rounded-2xl shadow-md p-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Activity Dashboard
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          Data and groups will be displayed here once they are added to
          the system.
        </p>

        <p className="text-gray-500 text-sm mt-4">
          This section will automatically update as new groups and
          activities are created.
        </p>

        <div className="mt-8">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            No data available yet
          </span>
        </div>
      </div>
    </div>
  );
}
