import React, { useContext, useState } from 'react'
import './contact.css'

import CartProject from '../cartProject/CartProject'
import AlertError from '../error/AlertError'
import axios from 'axios'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/ContextProvider'
import Title from '../title/Title'
const Contact = ({ type , Contact }) => {

    const {
        setIdProject, delet
    } = useContext(UserContext);





    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [linkGithub, setLinkGithub] = useState('');
    const [linkHost, setLinkHost] = useState('');
    const [image, setImage] = useState(null);

    const [errorTitre, setErrorTitre] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [errorLinkGithub, setErrorLinkGithub] = useState('');
    const [errorLinkHost, setErrorLinkHost] = useState('');
    const [errorImage, setErrorImage] = useState('');

    const [close, setclose] = useState(null);

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
                setIdProject(prev => prev + 1);
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

    const [numberAfficehrProject, setnumberAfficehrProject] = useState(3);
    
    return (
        <div className='commaintear portfolio'>
            <div>
                <Title title={"Contact"} />

                {
                    type ? <button className="btn ajouter_project " data-bs-toggle="modal" data-bs-target="#project" >Modifer Contact</button> : null
                }


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
                {/* {Project ? (
                    displayedProjects.map((item, index) => (
                        <CartProject
                            project={item}
                        />
                    ))
                ) : (
                    <div disabled>Loading ...</div>
                )} */}
            </div>

            

        </div>
    )
}

export default Contact