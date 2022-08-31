import { Form } from "./Form";
import { useDispatch } from "react-redux";
import { setUser  } from "../pages/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const SignUp = () => {
    const dispatch = useDispatch(); 
    const history = useNavigate();


    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
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
            title="register"
            handleClick={handleRegister}
        />
    )
}