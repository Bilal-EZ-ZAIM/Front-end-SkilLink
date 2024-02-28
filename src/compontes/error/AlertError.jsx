import React from 'react'

const AlertError = ({ error }) => {
    return (
        <small className="text-danger">{error}</small>
    )
}

export default AlertError