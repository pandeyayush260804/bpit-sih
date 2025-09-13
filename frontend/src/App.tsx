import Header from "./shared/component/header";
import AppRoutes from "./shared/routes/AppRoutes.tsx";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header always visible */}
      <Header />

      {/* Main content (routes) */}
      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
