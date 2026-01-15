import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
      {/* LEFT SIDE */}
      <div className="text-lg font-bold flex gap-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-300">
          About Us
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="text-lg font-bold">
        <Link to="/team" className="hover:text-gray-300">
          Meet the Team
        </Link>
      </div>
    </header>
  );
};

export default Header;
