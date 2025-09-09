import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      &nbsp;
      <Link to="/login">Login</Link>
      &nbsp;
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Header;
