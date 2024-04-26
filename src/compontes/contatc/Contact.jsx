import React, { useContext, useState } from 'react'
import './contact.css'

import CartProject from '../cartProject/CartProject'
import AlertError from '../error/AlertError'
import axios from 'axios'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/ContextProvider'
import Title from '../title/Title'
const Contact = ({ type, Contact }) => {

    const {
     setCountCountact
    } = useContext(UserContext);

    const [formData, setFormData] = useState();

    const handelClick = () => {
        setFormData({
            phone: Contact?.phone,
            facebook: Contact?.facebook,
            linkedin: Contact?.linkedin,
            github: Contact?.github,
        });

        console.log(formData);
    }



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitProject = async (event) => {
        event.preventDefault();
        const storedToken = localStorage.getItem('token');

        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + storedToken,
                    'Content-Type': 'multipart/form-data'
                }
            };

            console.log(formData);
            const response = await axios.post('http://127.0.0.1:8000/api/ajouterContact', formData, config);

            if (response.status === 201) {
                setCountCountact(prev => prev + 1);
                console.log("Données enregistrées avec succès !");

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
                    type ? <button className="btn ajouter_project " data-bs-toggle="modal" data-bs-target="#contact" onClick={handelClick} >Modifer Contact</button> : null
                }


                <div className="modal fade" id="contact" tabindex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form className='modal-body' onSubmit={handleSubmitProject}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="phone" className="form-control" id="phone" name="phone" value={formData?.phone} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="facebook" className="form-label">facebook</label>
                                        <input className="form-control" id="facebook" type='link' name="facebook" value={formData?.facebook} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="linkedin" className="form-label">linkedin</label>
                                        <input type="text" className="form-control" id="linkedin" name="linkedin" value={formData?.linkedin} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="github" className="form-label">github</label>
                                        <input type="text" className="form-control" id="github" name="github" value={formData?.github} onChange={handleChange} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss={"modal"}  >Envoyer</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>



            <div className='list_cart_project'>
                {Contact ? (
                    <div className="contact-item">
                        <h6> <i class="bi bi-telephone-fill"></i>  {Contact?.phone}</h6>
                        <p><i class="bi bi-facebook f-3"></i>  {Contact?.facebook}</p>
                        <p><i class="bi bi-linkedin f-3"></i>  {Contact?.linkedin}</p>
                        <p><i class="bi bi-github f-3"></i> {Contact?.github}</p>
                    </div>
                )
                    : (
                        <div disabled>Loading ...</div>
                    )}
            </div>




        </div>
    )
}

export default Contact