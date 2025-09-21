import Header from "./shared/component/header";
import AppRoutes from "./shared/routes/AppRoutes.tsx";
import Footer from "./shared/component/footer"; // 👈 import Footer

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header always visible */}
      <Header />

      {/* Main content (routes) */}
      <main className="flex-1">
        <AppRoutes />
      </main>

      {/* Footer always visible */}
      <Footer />
    </div>
  );
};

export default App;
