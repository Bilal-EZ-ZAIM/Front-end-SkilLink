import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertError from '../error/AlertError';
import Swal from 'sweetalert2';
import { UserContext } from '../../context/ContextProvider';

const CartOfferDeomplio = ({ offer, user, name }) => {

    const { IdP, setIdP, TypeUtilisateur } = useContext(UserContext);
    const { titre, image, prix, description } = offer;
    const { nom } = user;



    const [errorDescription, setErrorDescription] = useState('');
    const [descriptions, setDescription] = useState('');

    const handleIdDeOffer = (id) => {
        setIdP(id);
        console.log(id);
    }

    const handleSubmitPostilet = async (event) => {
        event.preventDefault();
        const storedToken = localStorage.getItem('token');
        console.log(IdP);
        const formData = {
            description: descriptions
        };

        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + storedToken,
                    'Content-Type': 'multipart/form-data'
                }
            };

            const response = await axios.post('http://127.0.0.1:8000/api/postile/' + IdP, formData, config);

            if (response.status === 201) {
                setErrorDescription("");
                setDescription('');
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
            console.log(error);
            if (error.response) {
                setErrorDescription(error.response.data.error?.description);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    customClass: {
                        background: 'red',
                    }
                });
            }
        }
    };

    return (
        <div className="card mt-5" style={{ maxWidth: '500px', minWidth: '250px', width: '100%' }}>
            <div className="card-body">
                {user.image ? (
                    <img
                        src={user.image}
                        alt="User Image"
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50px'
                        }}
                    />
                ) : (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Default Image"
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50px'
                        }}
                    />
                )}

                <p className="card-text">Nom: {nom} </p>
                <hr />
                {image !== "null" && <img src={image} className="card-img-top img-fluid" alt={titre} />}
                <p> {offer.id} </p>
                <p className="card-text">Titre: {titre}</p>
                <p className="card-text">discription: {description}</p>
                <p className="card-text">Prix: {prix}</p>
                <hr />
                {
                    name === "Detai" ?
                        <Link to={`/datalise/${offer.id}`} className="btn btn-primary"> {name} </Link> :

                        TypeUtilisateur === 2 && (
                            <div>
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uplod" onClick={() => handleIdDeOffer(offer.id)} > {name} </button>
                                <div className="modal fade" id="uplod" tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <form className='modal-body' onSubmit={handleSubmitPostilet} >
                                                <div className={"form-floating mb-3" + (errorDescription ? " has-error" : "")}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="description"
                                                        value={descriptions}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        placeholder="Entrez la description"
                                                    />
                                                    <label htmlFor="prix">Description</label>
                                                    {errorDescription && <AlertError error={errorDescription} />}
                                                </div>
                                                <button type="submit" className="btn btn-primary">Envoyer</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )


                }
            </div>
        </div>
    );
}

export default CartOfferDeomplio;
