import React from "react";
import "./HeroSectionHome.css";
import Button from "../button/Button";
const HeroSectionHome = () => {
  return (
    <div className="heroSection">
      <div className="container-md">
        <div className="lefth-heroSection">
          <h1>Vous recherchez des freelances ?</h1>
          <p>
            Embauchez d’excellents pigistes, rapidement. SkilLink vous aide à
            embaucher des freelances d'élite à tout moment
          </p>
          <Button name='Hire a freelancer'></Button>
        </div>
        <div className="rigth-heroSection">
            <div className="image-hero-section">
            <img src={require("../../image/herosection.png")} alt="Description de l'image" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionHome;
