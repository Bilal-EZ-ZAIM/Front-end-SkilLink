import React from 'react'
import "./education.css";
const Education = ({ nom, ecole, description, data_dube ,data_fine }) => {
    return (
        <div className='profile-info education'>
 
            <p><strong>Nom</strong> {nom}</p>
            <p><strong>école</strong> {ecole}</p>
            <p><strong>description</strong> {description}</p>
            <p><strong>Date debute</strong> {data_dube}</p>

        </div>
    )
}

export default Education