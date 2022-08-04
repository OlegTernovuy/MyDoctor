import React, { Component, useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

// export default class LoginPage extends Component {
export const LoginPage = ({
  setIsLoggedIn,
  // setUserName,
  setIsAdmin,
}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const history = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (login === "admin" && password === "123") {
      // setUserName(login)
      setIsLoggedIn(true);
      setIsAdmin(true);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("isAdmin", true);
      history("/");
    }
  };

  return (
    <>
      <form className="loginForm" onSubmit={handleLogin}>
        <h2>Авторизація</h2>
        <div>
          <input
            className="loginFormInput"
            type="text"
            placeholder="Логін"
            required
            onChange={handleLoginChange}
          />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="password"
            placeholder="Пароль"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button className="BlackBtn" type="submit">
            увійти
          </button>
        </div>
      </form>
    </>
  );
};
