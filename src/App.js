import "./App.css";
import React, { useContext, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./compontes/header/Header";
import Projets from "./page/projets/Projets";
import Independants from "./page/independants/Independants";

import Regrster from "./page/regester/Regrster"
import Home from "./page/home/Home";
import Login from "./page/login/Login"
import Footer from "./compontes/footer/Footer";
import Admin from "./page/admin/Admin";
import Profile from "./page/profile/Profile";
import ImageUpload from "./page/Ima";
import { UserContext } from "./context/ContextProvider";
import RequierAuth from "./auth/RequierAuth";
import PageNotFound from "./PageNotFound/PageNotFound";
import Freelancer from "./auth/AuthFreelancer";
import AuthAdmin from "./auth/AuthAdmin";
import AuthLoginRegester from "./auth/AuthLoginRegester";
import Cleint from "./page/cleint/Cleint";
import Datalis from "./page/detalis/Datalis";
import DetalisDeFeelancer from "./page/detalisDeFeelancer/DetalisDeFeelancer";
import Messager from "./page/messager/Messager";






function App() {

  const { isAuthenticated, utilisateur, setUtilisateur, isLogin, isToken, setToken } = useContext(UserContext);





  const [count, setcount] = useState(1);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/independants" element={<Independants />} />
          <Route path='/datalise/:id' element={<Datalis />} />
          <Route path='/DetalisDeFeelancer/:id' element={<DetalisDeFeelancer />} />


          <Route element={< AuthLoginRegester />} >
            <Route path="/login" element={<Login />} />
            <Route path="/regester" element={< Regrster />} />
          </Route>
          <Route path="/messager" element={<Messager />} />
          <Route path="/pro" element={<  ImageUpload />} />
          <Route element={<RequierAuth />} >

            <Route path="/cleint" element={< Cleint />} />
            <Route element={<Freelancer />} >
              <Route path="/profile" element={< Profile />} />
            </Route>

            <Route element={<AuthAdmin />} >
              <Route path="/admin" element={<Admin />} />
            </Route>


          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />

      </Router>
    </>
  );
}

export default App;
