import { Form } from "./Form";
import { useDispatch } from "react-redux";
import { setUser  } from "../pages/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export const Login = () => {
    const dispatch = useDispatch(); 
    const history = useNavigate();


    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((({user}) => {
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
            }))
        }))
        history("/")
        .catch(() => alert("error"))

    }
    return(
        <Form
            title="sign in"
            handleClick={handleLogin}
        />
    )
}