import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
      {/* Left-aligned Home */}
      <div className="text-lg font-bold">
        <Link to="/">Home</Link>
        &nbsp; &nbsp;
        <Link to="/about">About Us</Link> {/* 👈 Added here */}
        
      </div>

      
    </header>
  );
};

export default Header;
