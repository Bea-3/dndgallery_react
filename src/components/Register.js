import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const Register = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const history = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const userInfo = await createUserWithEmailAndPassword(auth,
                registerEmail,
                registerPassword,
                );
                console.log(userInfo)
                history.push('/user/gallery')
            }catch (error) {
                console.log(error.message);
            }
    }

   
    return ( 
        <div className="register-form">
            <h2>Register </h2>
            <form onSubmit={handleSubmit}>
            <label> Username:</label>
            <input 
            type="email" 
            required
            value={registerEmail}
            className="username"
            onChange={(e) => {
                setRegisterEmail(e.target.value);
            }}
            />
            <label> Password:</label>
            <input 
            type="password" 
            required
            value={registerPassword}
            className="password"
            onChange={(e) => {
                setRegisterPassword(e.target.value)
            }}
            />
            <button type="submit">
                Register
            </button>
            </form> 
        </div>
     );
}
 
export default Register;