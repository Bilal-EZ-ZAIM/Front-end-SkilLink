import React, { useState } from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink  } from "react-router-dom";
const Header = () => {
  const [toogle, settoogle] = useState(true);
  return (
    <header className="header">
      <div className="container-md d-flex justify-content-between ">
        <div className="logo d-flex align-items-center">
        Skil<span>Link</span>
        </div>
        <div className="menu_bar h-100  align-items-center">
          <i onClick={()=> settoogle(pre => pre = !toogle)} className={toogle === true ? "bi bi-list fs-1" : "bi bi-x-lg fs-1"}></i>
        </div>

        <ul className={ toogle === false ? "p-0 navBarMobil" : " p-0  navDesktop"}>
          <li onClick={()=> settoogle(true)} > <NavLink to="/"> Home </NavLink></li>
          <li onClick={()=> settoogle(true)} > <NavLink to="/projets"> Projets </NavLink></li>
          <li onClick={()=> settoogle(true)} > <NavLink to="/independants"> Indépendants </NavLink></li>
          <li onClick={()=> settoogle(true)} > <NavLink to="/login"> Se connecter </NavLink></li>
          <li onClick={()=> settoogle(true)} > <NavLink to="/regester"> S'inscrire </NavLink></li>
          <li onClick={()=> settoogle(true)} > <NavLink to="/admin"> Admin </NavLink></li>
          <li onClick={()=> settoogle(true)} > <NavLink to="/profile"> profile </NavLink></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
