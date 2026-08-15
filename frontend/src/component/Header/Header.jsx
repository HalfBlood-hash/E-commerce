import { NavLink } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../featrure/auth/authslice";

export default function Header() {


  const {user}=useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

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
                user ? <button type="button" onClick={handleLogout}>Logout</button> : <NavLink to="/login">Login</NavLink>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
