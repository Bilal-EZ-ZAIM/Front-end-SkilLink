import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/ContextProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './datalis.css'

const Datalis = () => {
    const { id } = useParams();

    const { setAccepter, setCountOfferDeOmpoila, details, setdetails, CountOfferDeOmpoila ,
        idMessageUser, setidMessageUser, newMessage,
        setnewMessage, sendMessage, handlSumeMessage
    } = useContext(UserContext);

    console.log(CountOfferDeOmpoila);

    const [idFree, setidFree] = useState();
    const [error, seterror] = useState();

    console.log("setId messager " + idMessageUser);

    console.log("Messager" + newMessage);


    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');

            try {
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + storedToken,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.get("http://127.0.0.1:8000/api/detaieOffer/" + id, config);
                setdetails(response.data);
            } catch (error) {

            }
        };

        fetchData();
    }, [id , CountOfferDeOmpoila]);

    const handelAccepeter = async (idFree) => {
        const storedToken = localStorage.getItem('token');
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + storedToken,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get(`http://127.0.0.1:8000/api/notification/${idFree}/${id}`, config);
            console.log(response.data.Notification.message);
            console.log(response.data.message);
            console.log(response);
            if (response.status === 200) {
                setAccepter(pre => pre + 1);
                Swal.fire({
                    title: 'Success!',
                    text: response.data.Notification.message,
                    icon: 'success',
                    customClass: {
                        background: 'green',
                    }
                });
            }
        } catch (error) {
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

    const [formData, setFormData] = useState({
        titre: details?.titre,
        description: details?.description,
        prix: details?.prix,
        image: null,
    });
    console.log(formData);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleUpdetOffeDeMpoli = async (event, id) => {
        event.preventDefault();
        const storedToken = localStorage.getItem('token');


        console.log(formData);

        const config = {
            headers: {
                Authorization: 'Bearer ' + storedToken,
                'Content-Type': 'multipart/form-data'
            }
        };
        try {

            const response = await axios.post(`http://127.0.0.1:8000/api/updateOffer/${details.id}`, formData, config);

            if (response.status === 200) {
                setCountOfferDeOmpoila((pre) => pre + 1);
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
    }






    return (
        <div className='detalis'>

            <div className='container-md mt-5'>
                <div class="card mb-3">
                    {
                        details?.image != "null" ? <img src={details?.image} class="card-img-top" style={{ minWidth: '250px', width: '100%', maxHeight: '500px' }} /> : null
                    }

                    <div class="card-body">
                        <h5 class="card-title"> {details?.titre} </h5>
                        <p class="card-text">
                            {details?.description}
                        </p>
                        <i className="bi btn btn-primary bi-pencil-square text-white " data-bs-toggle="modal" data-bs-target="#ModifeOfferDe"  ></i>
                    </div>
                    <div className="modal fade" id="ModifeOfferDe" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modifier le projet</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form onSubmit={handleUpdetOffeDeMpoli}>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="titre" className="form-label">Titre</label>
                                            <input type="text" className="form-control" id="titre" name="titre" value={formData.titre} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="discription" className="form-label">Description</label>
                                            <textarea className="form-control" id="discription" name="description" value={formData.description} onChange={handleChange} ></textarea>
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

                <div class="table-responsive">
                    <table class="table caption-top">
                        <caption>List of users Postile</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Freelancer</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details?.posteles?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className='d-flex align-items-center'>
                                        {item.users_postile.image ? (
                                            <Link to={`/DetalisDeFeelancer/${item.users_postile.id}`}>
                                                <img
                                                    src={item.users_postile.image}
                                                    alt="User Image"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%'
                                                    }}
                                                />
                                            </Link>
                                        ) : (
                                            <Link to={`/DetalisDeFeelancer/${item.users_postile.id}`}>
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                                    alt="Default Image"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%'
                                                    }}
                                                />
                                            </Link>
                                        )}
                                        <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>   {item.users_postile.nom}  </span>
                                    </td>
                                    <td>{item.description}</td>
                                    <td>
                                        <div className='d-flex justify-content-between'>

                                            {
                                                item.status == 2 ? <i class="bi bi-check2-square btn btn-primary" onClick={() => setidMessageUser(item.users_postile.id)} data-bs-toggle="modal" data-bs-target="#Messager"></i> : <button className="btn btn-primary" onClick={() => handelAccepeter(item.id)}>Accepter</button>
                                            }

                                        </div>
                                        <div className="modal fade" id="Messager" tabindex="-1" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <form className='modal-body' onSubmit={handlSumeMessage}>
                                                        <div className={"form-floating mb-3"}>
                                                            <textarea
                                                                type="text"
                                                                className="form-control"
                                                                id="titre"
                                                                value={newMessage}
                                                                onChange={(e) => setnewMessage(e.target.value)}
                                                            />
                                                            <label htmlFor="titre">Messager</label>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary" data-bs-dismiss={"modal"} >Envoyer</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>


            </div>


        </div>
    )
}

export default Datalis