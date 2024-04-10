import React, { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import AlertError from "../../compontes/error/AlertError";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../context/ContextProvider";

const Login = () => {
  const { setUserFound, setIsAuthenticated, utilisateur, setUtilisateur, isLogin, isToken, setToken, setTypeUtilisateur, TypeUtilisateur } = useContext(UserContext);

  const Navigaet = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      if (response.status === 200) {
        setTypeUtilisateur(response.data.user.role_id)
        setUtilisateur(response.data.user);
        setIsAuthenticated(true);
        setUserFound(true);
        console.log("Utilisateur registered successfully!");
        setEmail("");
        setPassword("");
        setErrorEmail("");
        setErrorPassword("");
        console.log(response.status);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);

        Navigaet('/');
      }
    } catch (error) {
      if (error.response) {

        console.log("Error response:", error.response);
        console.log("Error status:", error.response.status);
        console.log("Error data : ", error.response.data);
        setErrorEmail(error.response.data.error.email);
        setErrorPassword(error.response.data.error.password);
        if (typeof (error.response.data.error) === "string") {

          Swal.fire({
            title: 'Error!',
            text: error.response.data.error,
            icon: 'error',
            customClass: {
              background: 'red',
            }
          })
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <div className="regester container-md d-flex justify-content-between align-items-center">
      <div className="loginContainer">
        <form onSubmit={handleSubmit}>
          <div className={"form-floating mb-3" + (errorEmail ? " has-error" : "")}>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
            <label htmlFor="email">Adresse e-mail</label>
            {errorEmail && <AlertError error={errorEmail} />}
          </div>
          <div className={"form-floating mb-3" + (errorPassword ? " has-error" : "")}>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
            />
            <label htmlFor="password">Mot de passe</label>
            {errorPassword && <AlertError error={errorPassword} />}
          </div>
          
          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
