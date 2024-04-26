import React, { useContext, useEffect, useState } from 'react'
import "../profile/profile.css"
import { UserContext } from '../../context/ContextProvider';
import InfoFreelancer from '../../compontes/informationFreelancer/InfoFreelancer';
import CompetonceFreelancer from '../../compontes/competonceFreelancer/CompetonceFreelancer';
import CommentareFreelancer from '../../compontes/comontaire/CommentareFreelancer';
import ProjectProfile from '../../compontes/project/ProjectProfile';
import Education from '../../compontes/education/Education';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Title from '../../compontes/title/Title';
const DetalisDeFeelancer = () => {
    const {
        Educations, datelsFreelancers, setdatelsFreelancers,
        skillsDitalis, setskillsDitalis, projectDetails, setprojectDetails,
        commanterDatilse, setcommanterDatiles, getOfferDeOmoloi, educationsFrrelancer, seteducationsFrrelancer, setidMessageUser,
        idMessageUser, newMessage, setnewMessage, sendMessage, handlSumeMessage
    } = useContext(UserContext);


    console.log(educationsFrrelancer);


    const [count, setcount] = useState(0);
    const { id } = useParams();


    useEffect(() => {
        getOfferDeOmoloi("frrelancer/" + id, setdatelsFreelancers);
        getOfferDeOmoloi("commpetonce/" + id, setskillsDitalis);
        getOfferDeOmoloi("project/" + id, setprojectDetails);
        getOfferDeOmoloi("get/education/" + id, seteducationsFrrelancer);
    }, [id]);

    console.log(educationsFrrelancer);

    useEffect(() => {
        getOfferDeOmoloi("commentaires/" + id, setcommanterDatiles);
    }, [id, count]);

    const styleBtn = {
        backgroundColor: "transparent",
        color: "#fd9391",
        border: "2px solid #fd9391",
        padding: " 0 15px",
        borderRadius: "50px",
        fontSize: "18px",
        maxWidth: "150px"
    }

    const [numberAfficehrEducation, setnumberAfficehrEducation] = useState(3);
    const [contentButton, setcontentButton] = useState("afficher touts")
    const displayedEduction = educationsFrrelancer ? educationsFrrelancer?.slice(0, numberAfficehrEducation) : [];
    const [fond, setfond] = useState(1);
    const handelAffecher = () => {

        if (fond === 1) {
            setfond(0);
            setnumberAfficehrEducation(Educations?.length);
            setcontentButton('afficher moins');

        } else {
            setfond(1);
            setcontentButton('afficher touts')
            setnumberAfficehrEducation(3);
        }

    }


    return (
        <div className='profile mb-5' >

            <div className='background'></div>
            <div class='container-md information_freelancer'>
                <button style={styleBtn} onClick={() => setidMessageUser(id)} data-bs-toggle="modal" data-bs-target="#Messager" >Messager</button>
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
                <div class='info '>
                    <InfoFreelancer InfoFreelancer={datelsFreelancers} type={false} />

                    <CompetonceFreelancer skills={skillsDitalis} type={false} />
                </div>

                <CommentareFreelancer commanter={commanterDatilse} type={true} id={id} count={count} setcount={setcount} />

                <ProjectProfile type={false} Project={projectDetails} />

                <div className='commaintear education portfolio'>

                    <Title title={"Educations"} />


                    {educationsFrrelancer && educationsFrrelancer?.length > 0 ? (
                        displayedEduction?.map((item, index) => (
                            <Education Education={item} key={index} type={false} />
                        ))
                    ) : null}
                    {
                        educationsFrrelancer?.length > 3 && <div className="text-center m-4">
                            <button
                                className="btn btn-danger"
                                onClick={handelAffecher}
                            >
                                {contentButton}
                            </button>
                        </div>
                    }
                </div>
            </div>


        </div >
    );
}

export default DetalisDeFeelancer