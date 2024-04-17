import React from 'react';

const CartClient = ({ client, logout, handleSubmit, handleFileChange }) => {
  return (
    <div className="card mb-5 p-3 mt-5" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          {
            client?.image ? <img src={client?.image} className="img-fluid rounded-start mb-3" alt={client?.nom} /> 
            : <img className="img-fluid rounded-start mb-3" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
          }

          <button className="btn uplod " data-bs-toggle="modal" data-bs-target="#uplod" >uplod img</button>
          <div className="modal fade" id="uplod" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">

                <form className='uplodForm modal-body  d-flex flex-dercition-col' onSubmit={handleSubmit} >
                  <label htmlFor="img"> Télécharger  photo </label>
                  <input type="file" id='img' className='d-none' onChange={handleFileChange} />
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Envoyer</button>
                </form>
              </div>

            </div>
          </div>
          <p> <strong> email </strong> {client?.email} </p>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{client?.nom} {client?.prenom}</h5>
            <p className="card-text">{client?.discription}</p>
            <button class="btn btn-primary" onClick={() => logout()} >Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartClient;
