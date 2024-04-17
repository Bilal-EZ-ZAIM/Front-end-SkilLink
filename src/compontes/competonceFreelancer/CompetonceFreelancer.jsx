import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/ContextProvider';
import axios from 'axios';
import Swal from 'sweetalert2';


const CompetonceFreelancer = ({ type, skills }) => {

    const {

        Competons, delet,
        IdSkills, setIdSkills,
        setCompetons, getOfferDeOmoloi

    } = useContext(UserContext);

    useEffect(() => {
        getOfferDeOmoloi('getAll/commpetonce', setCompetons);
    }, []);


    const handleSuppremerCompetence = async (id) => {

        await delet("suppermer/competonce", id , setIdSkills);




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
    return (
        <div class='info_two'>
            <div className='title'>
                <h5>compétences</h5>
                {
                    type ? <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" > Modifier les compétences </button> : null
                }

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
                        <div className='skills_item' key={index}><strong>{item.name}</strong> {type ? <button onClick={() => handleSuppremerCompetence(item.id)}> <i className="bi bi-trash"></i></button> : null}  </div>
                    ))
                ) : (
                    <p>loading ...</p>
                )}
            </div>
        </div>
    )
}

export default CompetonceFreelancer