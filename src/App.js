import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./compontes/header/Header";
import Projets from "./page/projets/Projets";
import Independants from "./page/independants/Independants";
import Regrster from "./page/regester/Regrster";
import Home from "./page/home/Home";
import Login from "./page/login/Login"
function App() {
  const [count, setcount] = useState(1);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/projets" element={<Projets/>} />
          <Route path="/independants" element={<Independants />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/regester" element={< Regrster />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
