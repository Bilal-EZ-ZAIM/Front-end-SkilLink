import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../context/ContextProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Datalis = () => {
    const { id } = useParams();
    const { setid, fetchData, details, setdetails,
        idMessageUser, setidMessageUser, newMessage,
        setnewMessage, sendMessage, handlSumeMessage
    } = useContext(UserContext);

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
    }, [id]);

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