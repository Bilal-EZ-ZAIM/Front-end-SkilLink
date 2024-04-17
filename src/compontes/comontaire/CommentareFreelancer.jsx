import React, { useContext, useState } from 'react'
import CartCommentes from '../cartComments/CartCommentes'
import { UserContext } from '../../context/ContextProvider';
import AlertError from '../error/AlertError';
import Swal from 'sweetalert2';
import axios from 'axios';

const CommentareFreelancer = ({ commanter, id, setcount, count ,type}) => {

    const [description, setdescription] = useState();
    const [error, seterror] = useState()

    const {
        Comantear,

    } = useContext(UserContext);


    const handlSubmitCommentair = async (event) => {

        event.preventDefault();
        const storedToken = localStorage.getItem('token');

        try {

            const formData = {
                commentaire: description
            }

            const config = {
                headers: {
                    Authorization: 'Bearer ' + storedToken,
                }
            };
            const response = await axios.post('http://127.0.0.1:8000/api/ajouter/commentaire/' + id, formData, config);

            console.log(response);
            console.log(response.status);

            if (response.status === 201) {
                setcount(pre => pre + 1);
                console.log("Données enregistrées avec succès !");
                setdescription(" ");


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
                seterror(error.response.data.error.commentaire)
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up the request:", error.message);
            }
        }
    }

    const styleBtn = {
        backgroundColor: "transparent",
        color: "#FF4C4A",
        border: "2px solid #FF4C4A",
        padding: " 0 15px",
        borderRadius: "50px",
        fontSize: "12px",
    }

    const styleDiv = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        borderBottom: "1px solid #E5E5E5",
        padding: "15px",
        gab: "30px"
    }


    return (
        <div className='commaintear' style={{ position: "relative" }}>
            <div style={styleDiv}>
                <h3>Commentaires</h3>
                {
                    type ? <button className="btn" style={styleBtn} data-bs-toggle="modal" data-bs-target="#education" >Ajouter Commontaire</button> : null
                }

            </div>

            <div className='list_cart'>
                {commanter ? (
                    commanter?.map((item, index) => (
                        <CartCommentes key={index}
                            commantes={item?.commentaire}
                            image={item?.users?.image}
                            author={item?.users?.nom}
                            developer={item?.users?.developer_type?.nom}
                        />
                    ))
                ) : (
                    <div disabled>Loading ...</div>
                )}

            </div>

            <div className="modal fade" id="education" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className='modal-body' onSubmit={handlSubmitCommentair}>
                            <div className={"form-floating mb-3" + (error ? " has-error" : "")}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="titre"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    placeholder="Entrez le discription"
                                />
                                <label htmlFor="titre">Nom</label>
                                {error && <AlertError error={error} />}
                            </div>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss={"modal"}   >Envoyer</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default CommentareFreelancer