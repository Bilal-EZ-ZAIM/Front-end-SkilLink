import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/ContextProvider';
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './profile.css';
import AlertError from "../../compontes/error/AlertError";
import Education from '../../compontes/education/Education';
import InfoFreelancer from '../../compontes/informationFreelancer/InfoFreelancer';
import CompetonceFreelancer from '../../compontes/competonceFreelancer/CompetonceFreelancer';
import ProjectProfile from '../../compontes/project/ProjectProfile';
import CommentareFreelancer from '../../compontes/comontaire/CommentareFreelancer';
import Contact from '../../compontes/contatc/Contact';

const Profile = () => {

  const {
    count, fetchData,getContact, setgetContact,
    Comantear, setComantear,CountCountact, setCountCountact,
    IdSkills, Project, setProject, IdProject,
    utilisateur, CountEdicatio, setCountEdicatio, SupProject, setSupProject,
    logout, Skills, setSkills, setEducation, Educations, getOfferDeOmoloi, nomTypeDeveloper, setnomTypeDeveloper

  } = useContext(UserContext);



  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [linkGithub, setLinkGithub] = useState('');
  const [data, setData] = useState(null);
  const [dataF, setDataF] = useState(null);

  const [errorTitre, setErrorTitre] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorLinkGithub, setErrorLinkGithub] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorDateF, setErrorDateF] = useState('');

  const [close, setclose] = useState(null);


  // const fetchData = async (endPoint, storyData) => {
  //   const storedToken = localStorage.getItem('token');

  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: 'Bearer ' + storedToken,
  //         'Content-Type': 'application/json'
  //       }
  //     };
  //     const response = await axios.get(api + endPoint, config);
  //     storyData(response.data);
  //   } catch (error) {
  //   }
  // };


  // {
  //   Skills ? console.log("bilal oui ") : console.log("No Bilal");
  // }

  useEffect(() => {
    fetchData('get/competonce', setSkills);
  }, [IdSkills]);


  useEffect(() => {
    fetchData('profile/commentaires', setComantear);
  }, [count]);


  useEffect(() => {
    fetchData('project', setProject);
  }, [IdProject, SupProject]);

  useEffect(() => {
    fetchData('get/education', setEducation);
  }, [CountEdicatio]);
  useEffect(() => {
    fetchData('contact', setgetContact);
  }, [CountCountact]);

  console.log(getContact);

  useEffect(() => {
    getOfferDeOmoloi('getDeveloperType', setnomTypeDeveloper);
  }, []);

  console.log(nomTypeDeveloper);






  const Navigaet = useNavigate();
  const [imgData, setImgData] = useState(null);


  const handleSubmitEducation = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('token');



    const formData = {
      nom: titre,
      description: description,
      ecole: linkGithub,
      date_debut: data,
      date_fin: dataF,

    };


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
        setCountEdicatio(pre => pre + 1)
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

  const styleDiv = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    borderBottom: "1px solid #E5E5E5",
    padding: "15px",
    gab: "30px"
  }


  const styleBtn = {
    backgroundColor: "transparent",
    color: "#FF4C4A",
    border: "2px solid #FF4C4A",
    padding: " 0 15px",
    borderRadius: "50px",
    fontSize: "12px",
  }






  return (
    <div className='profile mb-5' >
      <div className='background'></div>
      <div class='container-md information_freelancer'>

        <div class='info'>

          <InfoFreelancer InfoFreelancer={utilisateur} type={true} />

          <CompetonceFreelancer skills={Skills} type={true} />
        </div>
        <Contact type={true}   Contact={getContact} />
        <CommentareFreelancer commanter={Comantear} type={false} />
        <ProjectProfile type={true}  Project={Project}  />

        <div className='commaintear education portfolio'>

          <div>
            <div style={styleDiv}>
              <h3>Educations</h3>
              <button className="btn" style={styleBtn} data-bs-toggle="modal" data-bs-target="#educations" >Ajouter Eductaion</button>
            </div>

            <div className="modal fade" id="educations" tabindex="-1" aria-hidden="true">
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
            {Educations && Educations.length > 0 ? (
              Educations.map((item, index) => (
                <Education Education={item} key={index} />
              ))
            ) : null}
          </div>
        </div>

      </div>
      <button type="submit" className="btn m-5" onClick={() => logout()} > log out </button>
    </div>
  );
};

export default Profile;
