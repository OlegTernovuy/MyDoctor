import React, { Component, useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Login } from "../../LogReg/Login";

export const LoginPage = () => {

  return (
    <div className="Form">
      <h2 className="formTitle">Авторизація</h2>
      <Login/>
      <p className="formRedirect">
        Or: <Link to="/Register">Register</Link>
      </p>
    </div>
  );
};
