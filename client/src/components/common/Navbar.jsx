import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={`/`} className="nav-logo">
          Caezelle's
        </Link>

        <ul className="nav-links">
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#packages">Packages</a>
          </li>
        </ul>

        <div className="nav-auth">
          <Link to={`/login`}>
            <button className="btn-login">Log In</button>
          </Link>

          <Link to={`/register`}>
            <button className="btn-register">Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
