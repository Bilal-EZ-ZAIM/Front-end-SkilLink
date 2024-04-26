import React, { useContext, useEffect, useState } from 'react'
import Pagination from '../../compontes/Pagination/Pagination'
import { UserContext } from '../../context/ContextProvider';
import axios from 'axios';
import CartOfferDeomplio from '../../compontes/CartOfferDeomplio/CartOfferDeomplio';
import './projets.css';
import Swal from 'sweetalert2';
import AlertError from '../../compontes/error/AlertError';
const Projets = () => {

  const { OfferDeOmpoloi, setCountOfferDeOmpoila, TypeUtilisateur, setpage } = useContext(UserContext);

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errorTitre, setErrorTitre] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorPrix, setErrorPrix] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const [close, setClose] = useState(null);
  const [prix, setprix] = useState();

  const handleSubmitProject = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    if (prix > 0) {
      formData.append('prix', prix);
    } else {
      setErrorPrix("le Pris is 1 > 0");
    }

    if (image) {
      formData.append('image', image);
    }


    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + storedToken,
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = await axios.post('http://127.0.0.1:8000/api/ajouter/offerDePlois', formData, config);

      if (response.status === 201) {
        setCountOfferDeOmpoila(pre => pre + 1);
        setpage(1);
        setTitre("");
        setDescription("");
        setImage(null);
        setErrorTitre("");
        setErrorDescription("");
        setErrorImage("");
        setErrorPrix("");

        Swal.fire({
          title: 'Succès!',
          text: response.data.message,
          icon: 'success',
          customClass: {
            background: 'green',
          }
        });
      }
    } catch (error) {
      if (error.response) {
        setClose(0);
        setErrorTitre(error.response.data.error.titre);
        setErrorDescription(error.response.data.error.description);
        setErrorImage(error.response.data.error.image);
        setErrorPrix(error.response.data.error.prix);

      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };


  return (
    <div className="container-md offer">

      {
        TypeUtilisateur === 3 && (
          <button type="button" className="btn btn-primary ajouter" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Ajouter
          </button>
        )
      }

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className='modal-body' onSubmit={handleSubmitProject}>
              <div className={"form-floating mb-3" + (errorTitre ? " has-error" : "")}>
                <input
                  type="text"
                  className="form-control"
                  id="titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Entrez le titre"
                />
                <label htmlFor="titre">Titre</label>
                {errorTitre && <AlertError error={errorTitre} />}
              </div>
              <div className={"form-floating mb-3" + (errorDescription ? " has-error" : "")}>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Entrez la description"
                />
                <label htmlFor="prix">Description</label>
                {errorDescription && <AlertError error={errorDescription} />}
              </div>

              <div className={"form-floating mb-3" + (errorPrix ? " has-error" : "")}>
                <input
                  type="number"
                  className="form-control"
                  id="Prix"
                  value={prix}
                  onChange={(e) => setprix(e.target.value)}
                  placeholder="Entrez la Prix"
                />
                <label htmlFor="prix">Prix</label>
                {errorPrix && <AlertError error={errorPrix} />}
              </div>


              <div className={"form-floating mb-3" + (errorImage ? " has-error" : "")}>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="image">Image</label>
                {errorImage && <AlertError error={errorImage} />}
              </div>
              <button type="submit" className="btn btn-primary" data-bs-dismiss={close === 1 ? "modal" : null}  >Envoyer</button>
            </form>

          </div>

        </div>
      </div>


      <div className='row justify-content-center'>
        {OfferDeOmpoloi?.data ? (
          OfferDeOmpoloi?.data.map((item, index) => (
            <div className="col-12 mb-3 d-flex justify-content-center" key={index}>
              <CartOfferDeomplio offer={item} user={item.users} name={'Postuler'} />
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
      <div className='d-flex justify-content-center '>
        {OfferDeOmpoloi && <Pagination offerDemploi={OfferDeOmpoloi} fond={'offerdeploi'} />}
      </div>


    </div>

  );


}

export default Projets