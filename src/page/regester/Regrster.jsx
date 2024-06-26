import React, { useState } from "react";
import "./regrster.css";
import axios from "axios";
import AlertError from "../../compontes/error/AlertError";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const Navigaet = useNavigate();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(2);
  const [description, setDescription] = useState("");
  const [errorNom, setErrorNom] = useState("");
  const [errorPrenom, setErrorPrenom] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorDescription, setErrorDescription] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      role_id: userType,
      discription: description
    };

    console.log(formData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/', formData);

      console.log(response);
      console.log(response.status);

      if (response.status === 201) {
        console.log("Utilisateur registered successfully!");
        setNom("");
        setPrenom("");
        setEmail("");
        setPassword("");
        setErrorNom("");
        setErrorPrenom("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorDescription("");
        Navigaet('/login');
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response:", error.response);
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
        setErrorNom(error.response.data.error.nom);
        setErrorPrenom(error.response.data.error.prenom);
        setErrorEmail(error.response.data.error.email);
        setErrorPassword(error.response.data.error.password);
        setDescription(error.response.data.error.discription)
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
          <div className={"form-floating mb-3" + (errorNom ? " has-error" : "")}>
            <input

              type="text"
              className="form-control"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entrez votre nom"
            />
            <label htmlFor="nom">Nom</label>
            {errorNom && <AlertError error={errorNom} />}
          </div>
          <div className={"form-floating mb-3" + (errorPrenom ? " has-error" : "")}>
            <input
              type="text"
              className="form-control"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Entrez votre prénom"
            />
            <label htmlFor="prenom">Prénom</label>
            {errorPrenom && <AlertError error={errorPrenom} />}
          </div>
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
          <div class="form-floating">
            <textarea className="form-control mb-3" onChange={(e) => setDescription(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
            <label for="floatingTextarea2">Description</label>
            {errorDescription && <AlertError error={errorDescription} />}
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
          <div class="form-check">
            <input class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="freelancer"
              value="freelancer"
              onChange={() => setUserType(2)} checked />
            <label class="form-check-label" for="flexRadioDefault2">
              freelancer
            </label>
          </div>
          <div class="form-check ">
            <input className="form-check-input " onChange={() => setUserType(3)}
              type="radio"
              name="flexRadioDefault" id="client"
              value="client" />
            <label class="form-check-label" for="flexRadioDefault1">
              Client
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
