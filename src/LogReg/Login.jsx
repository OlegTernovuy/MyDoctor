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
        .catch(() => alert("Помилка: Введіть дані вірно!!!"))
        history("/")
        

    }
    return(
        <Form
            title="Sign in"
            handleClick={handleLogin}
        />
    )
}