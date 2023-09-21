import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState , useEffect} from "react";
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const history = useHistory();
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    // Listen for changes in authentication state only once when the component mounts
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []); // Empty dependency array to ensure the effect runs only once

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
