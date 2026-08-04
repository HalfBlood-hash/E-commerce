import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <nav>
      <div className="container">
        <div className="wrapper">
          <div>
            <NavLink to="/">Logo</NavLink>
          </div>

          <ul>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}