import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/ContextProvider';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './profile.css';
import Title from '../../compontes/title/Title';
import CartCommentes from '../../compontes/cartComments/CartCommentes';
import AlertError from "../../compontes/error/AlertError";
import CartProject from '../../compontes/cartProject/CartProject';
import Education from '../../compontes/education/Education';

const Profile = () => {



  const [loading, setLoading] = useState(true);



  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [linkGithub, setLinkGithub] = useState('');
  const [linkHost, setLinkHost] = useState('');
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [dataF, setDataF] = useState(null);

  const [errorTitre, setErrorTitre] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorLinkGithub, setErrorLinkGithub] = useState('');
  const [errorLinkHost, setErrorLinkHost] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorDateF, setErrorDateF] = useState('');

  const [close, setclose] = useState(null);




  const {
    Educations, Project, Comantear,
    api, Competons, Developer,
    IdSkills, setIdSkills, skills,
    utilisateur, setUtilisateur, isLogin,
    isAuthenticated,
    setIsAuthenticated

  } = useContext(UserContext);
  const [imgData, setImgData] = useState(null);
  const Navigaet = useNavigate();


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);
    const token = localStorage.getItem('token');


    try {
      const response = await axios.post(api + 'upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });


      isLogin();
    } catch (error) {
      console.log(error);
      console.error(error.response.data.errors.image[0]);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.errors.image[0],
        icon: 'error',
        customClass: {
          background: 'red',
        }
      })
    }
  };

  const logout = async () => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const config = {
          headers: {
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.get('http://127.0.0.1:8000/api/logout', config);

        if (response.status === 200) {
          localStorage.removeItem('token');
          setUtilisateur("");
          setIsAuthenticated(false);
          Navigaet('/login');
        }

      } catch (error) {
        console.error('Erreur lors de la requête GET :', error);
      }
      return true;
    }

  }

  const handleSuppremerCompetence = async (id) => {


    const storedToken = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + storedToken,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.delete('http://127.0.0.1:8000/api/suppermer/competonce/' + id, config);

      console.log(response.data.message);
      if (response.status === 201) {

        setIdSkills(prev => prev + 1);
        Swal.fire({
          title: 'Succès!',
          text: response.data.message,
          icon: 'success',
          customClass: {
            background: 'green',
          }
        });

      } else {
        console.error('Échec de l\'ajout de la compétence');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la compétence :', error);
    }
  }

  const handleAddCompetence = async () => {
    const storedToken = localStorage.getItem('token');
    const formData = {
      competonce_id: IdSkills,
    };



    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + storedToken,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post('http://127.0.0.1:8000/api/ajouter/competonce', formData, config);

      if (response.status === 201) {


        setIdSkills(prev => prev + 1);
        Swal.fire({
          title: 'Succès!',
          text: response.data.message,
          icon: 'success',
          customClass: {
            background: 'green',
          }
        });

      } else {
        Swal.fire({
          title: 'Errore',
          text: response.data.message,
          icon: 'success',
          customClass: {
            background: 'green',
          }
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la compétence :', error);
    }
  }

  const handleSubmitProject = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('token');



    const formData = {
      titre: titre,
      discription: description,
      link_github: linkGithub,
      link_host: linkHost,
      image: image,
    };

    console.log(formData);

    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + storedToken,
          'Content-Type': 'multipart/form-data'
        }
      };
      const response = await axios.post('http://127.0.0.1:8000/api/ajouter/project', formData, config);


      if (response.status === 201) {
        setIdSkills(prev => prev + 1);
        setclose(1);
        console.log("Données enregistrées avec succès !");
        setTitre("");
        setDescription("");
        setLinkGithub("");
        setLinkHost("");
        setImage(null);
        setErrorTitre("");
        setErrorDescription("");
        setErrorLinkGithub("");
        setErrorLinkHost("");
        setErrorImage("");

        Swal.fire({
          title: 'Succès!',
          text: response.data.message,
          icon: 'success',
          customClass: {
            background: 'green',
          }
        })
      }
    } catch (error) {
      if (error.response) {
        setclose(0);
        setErrorTitre(error.response.data.error.titre);
        setErrorDescription(error.response.data.error.description);
        setErrorLinkGithub(error.response.data.error.link_github);
        setErrorLinkHost(error.response.data.error.link_host);
        setErrorImage(error.response.data.error.image);

      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };


  const handleSubmitEducation = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('token');



    const formData = {
      nom: titre,
      description: description,
      ecole: linkGithub,
      date_debut: data,
      date_fin: dataF
    };

    console.log(formData);

    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + storedToken,
          'Content-Type': 'multipart/form-data'
        }
      };
      const response = await axios.post('http://127.0.0.1:8000/api/ajouter/education', formData, config);

      console.log(response);
      console.log(response.status);

      if (response.status === 201) {
        setclose(1);
        console.log("Données enregistrées avec succès !");
        setTitre("");
        setDescription("");
        setLinkGithub("");

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
        setErrorTitre(error.response.data.error.nom);
        setErrorDescription(error.response.data.error.description);
        setErrorLinkGithub(error.response.data.error.ecole);
        setErrorDate(error.response.data.error.date_debut);
        setclose(0);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };





  return (
    <div className='profile' >
      <div className='background'></div>
      <div class='container-md information_freelancer'>
        <div class='info '>
          <div class='info_one'>
            <div className='image_freelancer'>
              <div className='image'>
                <img src={utilisateur?.image} alt="" />
                <button className="btn uplod " data-bs-toggle="modal" data-bs-target="#uplod" >uplod img</button>
                <div className="modal fade" id="uplod" tabindex="-1" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">

                      <form className='uplodForm modal-body  d-flex flex-dercition-col' onSubmit={handleSubmit} >
                        <label htmlFor="img"> Télécharger  photo </label>
                        <input type="file" id='img' className='d-none' onChange={handleFileChange} />
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Envoyer</button>
                      </form>
                    </div>

                  </div>
                </div>
                <div className='contact'>
                  <div className='email'>
                    <i className="bi bi-envelope-fill"></i>
                    <strong> {utilisateur?.email} </strong>
                  </div>
                  <div className='phone'>
                    <i className="bi bi-google"></i>
                    <strong> +212 658123478 </strong>
                  </div>
                </div>
              </div>

              <div className='description'>
                <button className="btn modiferProfile btn" data-bs-toggle="modal" data-bs-target="#exampleModal" > Modifier les compétences </button>
                <div>
                  <h4> <strong> {utilisateur?.nom} {utilisateur?.prenom}</strong> </h4>

                  <p> {Developer?.nom}  </p>
                </div>
                <div className='peix_houres'>
                  <div className='email'>
                    <i className="bi bi-envelope-fill"></i>
                    <strong> {utilisateur?.nom} </strong>
                  </div>
                  <div className='phone'>
                    <i className="bi bi-google"></i>
                    <strong> 278 DH/h </strong>
                  </div>
                </div>

                <div className='description_user'>

                  <p>
                    {utilisateur?.discription}

                  </p>
                </div>

              </div>



            </div>
          </div>
          <div class='info_two'>
            <div className='title'>
              <h5>compétences</h5>
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" > Modifier les compétences </button>
              <div className="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Ajouter compétence</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="competence" className="form-label">Sélectionner une compétence :</label>
                        <select className="form-select" onClick={(e) => setIdSkills(e.target.value)} name="competence" id="competence">
                          {Competons ? (
                            Competons.map((item, index) => (
                              <option value={item.id} key={index}>{item.name}</option>
                            ))
                          ) : (
                            <option disabled>Loading ...</option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                      <button type="button" className="btn btn-primary" onClick={handleAddCompetence} data-bs-dismiss="modal">Ajouter</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className='skills'>
              {skills ? (
                skills.map((item, index) => (
                  <div className='skills_item' key={index}><strong>{item.name}</strong> <button onClick={() => handleSuppremerCompetence(item.id)}><i className="bi bi-trash"></i></button> </div>
                ))
              ) : (
                <p>loading ...</p>
              )}
            </div>
          </div>
        </div>


        <div className='commaintear portfolio'>
          <div>
            <Title title={"Mon portfolio"} />
            <button className="btn ajouter_project " data-bs-toggle="modal" data-bs-target="#project" >Ajouter Project</button>
            <div className="modal fade" id="project" tabindex="-1" aria-hidden="true">
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
                      <label htmlFor="description">Description</label>
                      {errorDescription && <AlertError error={errorDescription} />}
                    </div>
                    <div className={"form-floating mb-3" + (errorLinkGithub ? " has-error" : "")}>
                      <input
                        type="text"
                        className="form-control"
                        id="link_github"
                        value={linkGithub}
                        onChange={(e) => setLinkGithub(e.target.value)}
                        placeholder="Entrez le lien GitHub"
                      />
                      <label htmlFor="link_github">Lien GitHub</label>
                      {errorLinkGithub && <AlertError error={errorLinkGithub} />}
                    </div>
                    <div className={"form-floating mb-3" + (errorLinkHost ? " has-error" : "")}>
                      <input
                        type="text"
                        className="form-control"
                        id="link_host"
                        value={linkHost}
                        onChange={(e) => setLinkHost(e.target.value)}
                        placeholder="Entrez le lien de l'hébergement"
                      />
                      <label htmlFor="link_host">Lien de l'hébergement</label>
                      {errorLinkHost && <AlertError error={errorLinkHost} />}
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
          </div>



          <div className='list_cart_project'>
            {Project ? (
              Project.map((item, index) => (
                <CartProject
                  image={item.image}
                />
              ))
            ) : (
              <div disabled>Loading ...</div>
            )}

          </div>
        </div>

        <div className='commaintear'>
          <Title title={"Commentaires"} />

          <div className='list_cart'>
            {Comantear ? (
              Comantear?.map((item, index) => (
                <CartCommentes
                  commantes={item.commentaire}
                  image={item.users.image}
                  author={item.users.nom} key={index}
                  developer={item.users.developer_type.nom}
                />
              ))
            ) : (
              <div disabled>Loading ...</div>
            )}

          </div>
        </div>

        <div className='commaintear education portfolio'>

          <div>
            <Title title={"Educations"} />
            <button className="btn ajouter_project " data-bs-toggle="modal" data-bs-target="#education" >Ajouter Eductaion</button>
            <div className="modal fade" id="education" tabindex="-1" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <form className='modal-body' onSubmit={handleSubmitEducation}>
                    <div className={"form-floating mb-3" + (errorTitre ? " has-error" : "")}>
                      <input
                        type="text"
                        className="form-control"
                        id="titre"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        placeholder="Entrez le Nome"
                      />
                      <label htmlFor="titre">Nom</label>
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
                      <label htmlFor="description">Description</label>
                      {errorDescription && <AlertError error={errorDescription} />}
                    </div>
                    <div className={"form-floating mb-3" + (errorLinkGithub ? " has-error" : "")}>
                      <input
                        type="text"
                        className="form-control"
                        id="link_github"
                        value={linkGithub}
                        onChange={(e) => setLinkGithub(e.target.value)}
                        placeholder="Entrez le Ecole"
                      />
                      <label htmlFor="link_github">Ecole</label>
                      {errorLinkGithub && <AlertError error={errorLinkGithub} />}
                    </div>
                    <div className={"form-floating mb-3" + (errorDate ? " has-error" : "")}>
                      <input
                        type="date"
                        className="form-control"
                        id="dateb"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="Entrez le Date de début"
                      />
                      <label htmlFor="dateb">Date dubet </label>
                      {errorDate && <AlertError error={errorDate} />}
                    </div>
                    <div className={"form-floating mb-3" + (errorImage ? " has-error" : "")}>
                      <input
                        type="date"
                        className="form-control"
                        id="image"
                        onChange={(e) => setDataF(e.target.value)}
                      />
                      <label htmlFor="image">Date de fine</label>
                      {errorImage && <AlertError error={errorDateF} />}
                    </div>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss={close === 1 ? "modal" : null}   >Envoyer</button>
                  </form>

                </div>

              </div>
            </div>
          </div>

          <div className='list_education'>
            {Educations ? (
              Educations?.map((item, index) => (
                <Education
                  nom={item.nom}
                  ecole={item.ecole}
                  description={item.description}
                  data_dube={item.date_debut}
                />
              ))
            ) : (
              <div disabled>Loading ...</div>
            )}

          </div>
        </div>
      </div>


      <h1>Profil Utilisateur</h1>
      <img className='imageProfile' src={utilisateur?.image} alt="User Image" />

      <p>Erreur: Impossible de charger l'image de l'utilisateur.</p>

      <div className="profile-info">
        {utilisateur ? (
          <>
            <p><strong>ID:</strong> {utilisateur.id}</p>
            <p><strong>Nom:</strong> {utilisateur.nom}</p>
            <p><strong>Prénom:</strong> {utilisateur.prenom}</p>
            <p><strong>Email:</strong> {utilisateur.email}</p>
          </>
        ) : (
          <p>Erreur: Impossible de charger les informations de l'utilisateur.</p>
        )}

        <button type="submit" className="btn btn-primary w-100" onClick={() => logout()} > log out </button>

        <form onSubmit={handleSubmit}>
          <input type="file" id='img' onChange={handleFileChange} />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
