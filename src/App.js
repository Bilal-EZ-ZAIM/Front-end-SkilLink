import "./App.css";
import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./compontes/header/Header";
import Projets from "./page/projets/Projets";
import Independants from "./page/independants/Independants";
import Regrster from "./page/regester/Regrster";
import Home from "./page/home/Home";
import Login from "./page/login/Login"
import Footer from "./compontes/footer/Footer";
import Admin from "./page/admin/Admin";
import Profile from "./page/profile/Profile";
import ImageUpload from "./page/Ima";

const AuthGuard = ({ children }) => {

  const isAuthenticated = false;


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const [count, setcount] = useState(1);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/independants" element={<Independants />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regester" element={< Regrster />} />
          <Route path="/profile" element={< Profile />} />
          <Route path="/pro" element={<  ImageUpload />} />
          <Route
            path="/admin"
            element={
              <AuthGuard>
                <Admin />
              </AuthGuard>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
