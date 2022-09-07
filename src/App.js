import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import { Declaration } from "./pages/Declarations/Declaration";
import { AddVac } from "./pages/addVac/AddVac";
import { Home } from "./pages/Home/Home";
import { AddPrice } from "./pages/price/AddPrice";
import { LoginPage } from "./pages/Login/LoginPage";
import { Register } from "./pages/Register/Register";
import { Appointments } from "./pages/onlineAppo/onlineappoint";

import { useAuth } from "./hooks/use-auth";
import { removeUser } from "./pages/store/slices/userSlice";

import Header from "./Components/Header";
import Footer from "./Components/footer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  return (
    <>
      <Header
        isAuth={isAuth}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        // setIsAdmin={setIsAdmin}
      />
      <Routes>
        <Route index element={<Home />} />
        <Route path="addVac" element={<AddVac isAuth={isAuth} />} />
        <Route path="declaration" element={<Declaration />} />
        <Route path="price" element={<AddPrice isAuth={isAuth} />} />
        <Route path="loginPage" element={<LoginPage />} />
        <Route path="Register" element={<Register />} />
        <Route path="onlineappoint" element={<Appointments />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
