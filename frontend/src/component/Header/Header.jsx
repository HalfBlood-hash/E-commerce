import { NavLink } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";

export default function Header() {


  const {user}=useSelector((state) => state.auth)

  

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
            <p>{user && user.username}</p>
            <li>
              {
                user?<NavLink to="/login">Logout</NavLink>:<NavLink to="/login">Login</NavLink>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}