import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
      {/* Left-aligned Home */}
      <div className="text-lg font-bold">
        <Link to="/">Home</Link>
      </div>

      {/* Right-aligned Login & Register */}
      <div className="space-x-4 text-lg">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
