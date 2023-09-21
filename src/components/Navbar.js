import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const history = useHistory();

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
  });

  // logout
  const logout = async () => {
    try {
      await signOut(auth);
      history.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <h1>DND Gallery</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        {user ? (
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
