import React, { useContext } from 'react';
import "./education.css";
import { UserContext } from '../../context/ContextProvider';

const Education = ({ Education, type }) => {
    const {

        countSupEducation, setcountSupEducation , setCountEdicatio , delet
 
    } = useContext(UserContext);

    const handleSuppremerCompetence = async (id) => {
        await delet("suppremer/education", id, setCountEdicatio);
    }
    return (
        <div className='profile-info education'>
            {Education ? (
                <div>
                    <p><strong>Nom</strong> {Education.nom}</p>
                    <p><strong>école</strong> {Education.ecole}</p>
                    <p><strong>description</strong> {Education.description}</p>
                    <p><strong>Date debute</strong> {Education.date_debut}</p>
                    {
                        type ? <i class="bi bi-trash fs-4" onClick={() => handleSuppremerCompetence(Education?.id)}></i> : null
                    }

                </div>
            ) : (
                <p>Aucune donnée d'éducation disponible pour le moment.</p>
            )}
        </div>
    );
}

export default Education;
