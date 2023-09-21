import { useState , useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";

const Login = () => {

    // tracking user input
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const history = useHistory();

    const [user, setUser] = useState(null); // Initialize user state as null
    // // track logged in user 
    // const [user, setUser] = useState({});
    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser)
    // });
    

    // const handleSubmit = async (e) =>{
    //    e.preventDefault();
    //      // login fxn 
    //     try{
    //         const userInfo = await signInWithEmailAndPassword(
    //             auth,
    //             loginEmail,
    //             loginPassword
    //         );
    //         const user = userInfo.user;
    //         console.log(user)
    //         history.push('/user/gallery');
    //     } catch (error) {
    //         console.log(error.message)
    //     };

    // }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
      }, []); // Empty dependency array

      const [error, setError] = useState(null); // Add error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const userInfo = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = userInfo.user;
      console.log(user);
      history.push('/user/gallery');
    } catch (error) {
      setError(error.message); // Set the error message
    }
  };
    
    return ( 
        <div className="login-form">
             {error && <p className="error-message">{error}</p>}
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
            <label> Username:</label>
            <input 
            type="email" 
            required
            className="username"
            value={loginEmail}
            onChange={(e) => {
                setLoginEmail(e.target.value)
            }}
            />
            <label> Password:</label>
            <input 
            type="password" 
            value={loginPassword}
            required
            className="password"
            onChange={(e) => {
                setLoginPassword(e.target.value)
            }}
            />
            <button type="submit">
                Login
            </button>
            </form> 
            <p> Don't have an account? <Link to="/register">Register Here</Link> </p>
        </div>
     );
}
 
export default Login;