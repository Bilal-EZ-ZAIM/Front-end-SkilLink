import React from 'react'
import "./education.css";
const Education = ({ Education }) => {
    console.log(Education.nom);
    return (
        <div className='profile-info education'>
 
            <p><strong>Nom</strong> {Education.nom}</p>
            <p><strong>école</strong> {Education.ecole}</p>
            <p><strong>description</strong> {Education.description}</p>
            <p><strong>Date debute</strong> {Education.date_debut}</p>

        </div>
    )
}

export default Education