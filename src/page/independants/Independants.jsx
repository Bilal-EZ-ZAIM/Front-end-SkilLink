import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/ContextProvider';
import { useContext } from 'react';

const Independants = () => {
  const { freelancers, setfreelancer } = useContext(UserContext)
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/freelancers');

        if (response.status === 200) {
          setfreelancer(response.data);
        }

      } catch (error) {

        console.log(error);
      }

    }
    getData()
  }, [])
  return (
    <div>

      <main>

        <section class="indeponto py-5 text-center container-md" style={{ minHeight: '40vh' }}>
          <div class="row py-lg-5">
            <div class="parent col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-light">Bienvenue sur notre plateforme Freelancer</h1>
              <p class="lead text-body-secondary">Trouvez les meilleurs freelancers pour vos projets</p>
            </div>
          </div>
        </section>

        <div class="album py-5 bg-body-tertiary">
          <div class="container">

            <div class="">

              {freelancers ? (
                freelancers?.map((freelancer) => (
                  <div key={freelancer.id} className="card mb-3" style={{ maxWidth: '100%' }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={freelancer.image} className="img-fluid rounded-start" alt="Photo de profil du Freelancer" />

                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h4> {freelancer.developer_type?.nom} </h4>
                          <h5 className="card-title">{freelancer.nom} {freelancer.prenom}</h5>
                          <p className="card-text">{freelancer.discription}</p>
                          <p> <strong>email : </strong> {freelancer.email} </p>
                          <h4>Skills</h4>
                          <ul>
                            {
                              freelancer.competonces.map((item, index) => (
                                <li key={index}>
                                  {item.name}
                                </li>

                              ))
                            }
                          </ul>
                          <Link to={`/DetalisDeFeelancer/${freelancer.id}`} className="btn btn-primary"> see mor </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                ))
              ) : (

                <div className="landing container-md card m-5" aria-hidden="true" style={{ height: '80vh', maxWidth: '100%' }}>
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                    <a href="#" className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Independants;
