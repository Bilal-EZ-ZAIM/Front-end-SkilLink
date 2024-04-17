import React, { useState, useContext } from 'react';
import './cartProject.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { UserContext } from '../../context/ContextProvider';

const CartProject = ({ project }) => {
    const { setSupProject, utilisateur, delet , SupProject} = useContext(UserContext);
    const [formData, setFormData] = useState({
        titre: project.titre,
        discription: project.discription,
        image: null,
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handlSuppremerProject = (id) => {
        delet("suppremer/project", id, setSupProject);
    }

    const handlModiferProject = async (event) => {
        event.preventDefault();
        const storedToken = localStorage.getItem('token');
        const formDataToSend = new FormData();
        formDataToSend.append('titre', formData.titre);
        formDataToSend.append('discription', formData.discription);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }


        const config = {
            headers: {
                Authorization: 'Bearer ' + storedToken,
                'Content-Type': 'multipart/form-data'
            }
        };

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/updite/project/${project.id}`, formDataToSend, config);

            if (response.status === 200) {
                console.log( "SupProject = " +  SupProject);
                setSupProject((pre) => pre + 1);
                Swal.fire({
                    title: 'Succès!',
                    text: response.data.message,
                    icon: 'success',
                    customClass: {
                        background: 'green'
                    }
                });
            }
        } catch (error) {
            console.error('Erreur lors de la modification du projet :', error);
        }
    };

    return (
        <div className="card cart_Project">
            <img src={project.image} className="card-img-top" alt="Project" />
            <div className="card-body">
                <h5 className="card-title">{project.titre}</h5>
                <p className="card-text">{project.discription}</p>
                {utilisateur?.id === project.user_id && (
                    <div className="d-flex">
                        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#ModiferProject">
                            <i className="bi bi-pencil-square fs-4"></i>
                        </button>
                        <button className="btn" onClick={() => handlSuppremerProject(project.id)}>
                            <i className="bi bi-trash fs-4"></i>
                        </button>
                    </div>
                )}
            </div>

            <div className="modal fade" id="ModiferProject" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modifier le projet</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handlModiferProject}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="titre" className="form-label">Titre</label>
                                    <input type="text" className="form-control" id="titre" name="titre" value={formData.titre} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="discription" className="form-label">Description</label>
                                    <textarea className="form-control" id="discription" name="discription" value={formData.discription} onChange={handleChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input type="file" className="form-control" id="image" name="image" onChange={handleChange} accept="image/*" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <button type="submit" className="btn btn-primary">Enregistrer les modifications</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProject;
