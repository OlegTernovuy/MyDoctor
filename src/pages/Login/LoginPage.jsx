import React, { Component, useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Login } from "../../LogReg/Login";

export const LoginPage = () => {

  return (
    <div>
      <h2>Авторизація</h2>
      <Login/>
      <p>
        Or <Link to="/Register">Register</Link>
      </p>
    </div>
  );
};
