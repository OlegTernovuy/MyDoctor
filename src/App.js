import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'
import {useState} from 'react'

import {Declaration} from './pages/Declarations/Declaration';
import {AddVac} from './pages/addVac/AddVac';
import Home from './pages/Home/Home';
import {AddPrice} from './pages/price/AddPrice';
import {LoginPage} from './pages/Login/LoginPage';
import {Appointments} from './pages/onlineAppo/onlineappoint'


import Header from './Components/Header'
import Footer from './Components/footer';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true")
  const [userName, setUserName] = useState("")
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true")

  return (
    <>
    <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={userName} setIsAdmin={setIsAdmin}/>
      <Routes>
        <Route index element={<Home/>} />
        <Route path='addVac' element={<AddVac isAdmin={isAdmin}/>} />
        <Route path='declaration' element={<Declaration/>} />
        <Route path='price' element={<AddPrice isAdmin={isAdmin}/>} />
        <Route path='loginPage' element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} setIsAdmin={setIsAdmin}/>} />
        <Route path='onlineappoint' element={<Appointments/>} />
    </Routes>
    <Footer/>

    </>
  );
}

export default App;
