import React from 'react'
import './hedingParti.css'
const HedingParti = ({ is_Valid, titre, paragraphe }) => {
    return (
        <div className='HedingParti'>
            <div className='icon-Heading d-flex align-items-center gap-2'>
                <div className='icon d-flex justify-content-center align-items-center'>
                {is_Valid === 1 ? <i className="bi bi-check2 fs-1 d-flex justify-content-center align-items-center"></i> : null}
                
                   
                </div>
                <h3>{titre}</h3>
            </div>
            <p>{paragraphe}</p>
        </div >
    )
}

export default HedingParti