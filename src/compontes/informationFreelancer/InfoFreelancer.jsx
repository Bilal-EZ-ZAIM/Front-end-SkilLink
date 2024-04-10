import React, { useContext, useEffect } from 'react'
import './informationFreelancer.css'
import { UserContext } from '../../context/ContextProvider';
import AlertError from '../error/AlertError';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
const InfoFreelancer = ({ InfoFreelancer, type }) => {

    const {
        Educations, Project, Comantear,
        Competons, Developer, setDeveloper,
        IdSkills, setIdSkills, isLogin, fetchData, nomTypeDeveloper,
        logout, handleFileChange, handleSubmit, TypeUtilisateur

    } = useContext(UserContext);



    console.log(InfoFreelancer);


    const [nom, setNom] = useState(InfoFreelancer?.nom);
    const [prenom, setPrenom] = useState(InfoFreelancer?.prenom);
    const [description, setDescription] = useState(InfoFreelancer?.discription);
    const [prixHore, setPrixHore] = useState(InfoFreelancer?.prix_horaire);
    const [TypeDevelopres, setTypeDevelopres] = useState(InfoFreelancer?.developer)
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [errorNom, setErrorNom] = useState("");
    const [errorPrenom, setErrorPrenom] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [countMDP, setcountMDP] = useState(1)
    const handleUpditSubmit = async (event) => {
        event.preventDefault();

        const storedToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + storedToken,
                'Content-Type': 'application/json'
            }
        }
        const formData = {
            nom: nom,
            prenom: prenom,
            description: description,
            prix_horaire: prixHore,
            developer: TypeDevelopres,
        };

        console.log(formData);
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/updateProfile', formData, config);

            console.log(response);
            console.log(response.status);

            if (response.status === 201) {
                setcountMDP(pre => pre + 1)
                isLogin()
                setNom("");
                setPrenom("");
                setErrorPrenom("");
                setErrorDescription("");

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
                console.log("Error response:", error.response);
                console.log("Error status:", error.response.status);
                console.log("Error data:", error.response.data);
                setErrorNom(error.response.data.error.nom);
                setErrorPrenom(error.response.data.error.prenom);
                setDescription(error.response.data.error.discription)
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up the request:", error.message);
            }
        }
    };
    useEffect(() => {
        if (TypeUtilisateur === 2) {
            fetchData('DeveloperType', setDeveloper);
        }
    }, [countMDP]);


    return (
        <div class='info_one'>
            <div className='image_freelancer'>
                <div className='image'>
                    <img src={InfoFreelancer?.image} alt="" />
                    {
                        type ? <button className="btn uplod " data-bs-toggle="modal" data-bs-target="#uplod" >uplod img</button> : null
                    }

                    {
                        type ? <div className="modal fade" id="uplod" tabindex="-1" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">

                                    <form className='uplodForm modal-body  d-flex flex-dercition-col' onSubmit={handleSubmit} >
                                        <label htmlFor="img"> Télécharger  photo </label>
                                        <input type="file" id='img' className='d-none' onChange={handleFileChange} />
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Envoyer</button>
                                    </form>
                                </div>
                            </div>
                        </div> : null
                    }


                    <div className='contact'>
                        <div className='email'>
                            <i className="bi bi-envelope-fill"></i>
                            <strong> {InfoFreelancer?.email} </strong>
                        </div>
                        <div className='phone'>
                            <i class="bi bi-telephone-fill"></i>
                            <strong> +212 658123478 </strong>
                        </div>
                    </div>
                </div>

                <div className='description'>
                    {
                        type ? <button className="btn modiferProfile btn" data-bs-toggle="modal" data-bs-target="#profileModal" > Modifier Profile</button> : null
                    }
                    <div className="modal fade" id="profileModal" tabindex="-1" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form className='modal-body' onSubmit={handleUpditSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                        />
                                        <label htmlFor="floatingInput">Nom</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            value={prenom}
                                            onChange={(e) => setPrenom(e.target.value)}
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword">Prenom</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea
                                            className="form-control"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            id="floatingInput"
                                            style={{ height: '15vh' }}
                                        />
                                        <label htmlFor="floatingInput">Discription</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select name="" value={TypeDevelopres} onChange={(e) => setTypeDevelopres(e.target.value)} id="nomTypeDeveloper" className="form-control">
                                            {
                                                nomTypeDeveloper?.map((item) => (
                                                    <option value={item.id} key={item.id}  > {item.nom} </option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="nomTypeDeveloper">Developer</label>

                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="number" className="form-control" id="floatingPassword" onChange={(e) => setPrixHore(e.target.value)} value={prixHore} placeholder="Prix Hore" />
                                        <label for="floatingPassword">Prix par hour</label>
                                    </div>
                                    <button type="submit" className="btn mt-3 btn-primary" data-bs-dismiss={"modal"}   >Envoyer</button>
                                </form>

                            </div>




                        </div>

                    </div>

                    <div>
                        <h4> <strong> {InfoFreelancer?.nom} {InfoFreelancer?.prenom}</strong> </h4>
                        <p> {Developer?.nom}  </p>
                    </div>
                    <div className='peix_houres'>
                        <div className='email'>
                            <i class="bi bi-github"></i>
                            <strong> {InfoFreelancer?.nom} </strong>
                        </div>
                        <div className='phone'>
                            {
                                InfoFreelancer?.prix_horaire ? <> <i class="bi bi-clock"></i>
                                    <strong> {InfoFreelancer?.prix_horaire} DH/h </strong> </> : null
                            }

                        </div>
                    </div>
                    <div className='description_user'>
                        <p>
                            {InfoFreelancer?.discription}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoFreelancer