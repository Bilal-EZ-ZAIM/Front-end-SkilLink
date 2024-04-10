import React, { useContext, useState } from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/ContextProvider";
const Header = () => {
  const [toogle, settoogle] = useState(true);
  const { TypeUtilisateur, isAuthenticated, utilisateur, setpage } = useContext(UserContext);
  const [imgData, setImgData] = useState(null);
  return (
    <header className="header">
      <div className="container-md d-flex justify-content-between ">
        <div className="logo d-flex align-items-center">
          Skil<span>Link</span>
        </div>
        <div className="menu_bar h-100  align-items-center">
          <i onClick={() => settoogle(pre => pre = !toogle)} className={toogle === true ? "bi bi-list fs-1" : "bi bi-x-lg fs-1"}></i>
        </div>

        <ul className={toogle === false ? "p-0 navBarMobil" : " p-0  navDesktop"}>
          <li onClick={() => settoogle(true)} > <NavLink to="/"> Home </NavLink></li>
          <li onClick={() => settoogle(true)} > <NavLink to="/projets"> Offres d’emploi  </NavLink></li>
          <li onClick={() => settoogle(true)} > <NavLink to="/independants"> Indépendants </NavLink></li>
          <li onClick={() => settoogle(true)} > <NavLink to="/messager"> Messager </NavLink></li>
          {/* <li className="btn btn dropdown-toggle" type="button" data-bs-toggle="dropdown" onClick={() => settoogle(true)} > <NavLink to="/independants"> <i className="bi bi-bell"></i>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </NavLink></li> */}
          {!isAuthenticated && (
            <li onClick={() => settoogle(true)}>
              <NavLink to="/login">Se connecter</NavLink>
            </li>
          )}

          {!isAuthenticated && (
            <li onClick={() => settoogle(true)}>
              <NavLink to="/regester">S'inscrire</NavLink>
            </li>
          )}


          {TypeUtilisateur === 1 && (
            <li onClick={() => settoogle(true)} > <NavLink to="/admin"> Admin </NavLink></li>
          )}





          {TypeUtilisateur === 2 && (
            <li onClick={() => settoogle(true)} > <NavLink to="/profile">
              {utilisateur.image ? (
                <img
                  src={utilisateur.image}
                  alt="User Image"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50px'
                  }}
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Default Image"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50px'
                  }}
                />
              )}



            </NavLink></li>
          )}

          {TypeUtilisateur === 3 && (
            <li onClick={() => settoogle(true)} > <NavLink to="/cleint">
              {utilisateur.image ? (
                <img
                  src={utilisateur.image}
                  alt="User Image"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50px'
                  }}
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Default Image"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50px'
                  }}
                />
              )}



            </NavLink></li>
          )}

        </ul>
      </div>
    </header>
  );
};

export default Header;
