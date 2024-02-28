import React from 'react';
import './footer.css';
const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="logo d-flex align-items-center">
                    Skil<span>Link</span>
                </div>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <h5 className="mb-3">À propos de nous</h5>
                        <p>
                            Un site qui propose la vente de services de petite envergure de manière rapide et facile, permettant aux utilisateurs de parcourir une gamme variée de services disponibles et de les acheter en un seul clic.
                        </p>
                    </div>
                    <div className="col-md-3 mb-3">
                        <h5 className="mb-3">Pour les clients</h5>
                        <ul className="list-unstyled">
                            <li>Trouver des pigistes</li>
                            <li>Post-projet</li>
                            <li>Politique de remboursement</li>
                            <li>Politique de confidentialité</li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-3">
                        <h5 className="mb-3">Pour les indépendants</h5>
                        <ul className="list-unstyled">
                            <li>Chercher du travail</li>
                            <li>Créer un compte</li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-3">
                        <h5 className="mb-3">Contactez-nous</h5>
                        <div>
                            <i className="brand bi bi-instagram me-3"></i>
                            <i className="brand bi bi-twitter me-3"></i>
                            <i className="brand bi bi-facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
