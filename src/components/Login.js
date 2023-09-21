import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";

const Login = () => {

    // tracking user input
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState('');

    // track logged in user 
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    });
    

    const handleSubmit = async (e) =>{
       e.preventDefault();
         // login fxn 
        try{
            const userInfo = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            const user = userInfo.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            history.push('/user/gallery');
            setIsLoggedIn(true)
        } catch (error) {
            console.log(error.message)
        };

    }
    
    return ( 
        <div className="login-form">
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