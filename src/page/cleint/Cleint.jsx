import React, { useContext, useEffect } from 'react'
import './cleint.css'
import CartCleint from "../../compontes/cartCleint/CartCleint";
import { UserContext } from '../../context/ContextProvider';
import CartOfferDeomplio from '../../compontes/CartOfferDeomplio/CartOfferDeomplio';
const Cleint = () => {
  const { fetchData, utilisateur, logout, handleSubmit, handleFileChange, OfferDeOmpoloiuser, setOfferDeOmpoloiDeuser, CountOfferDeOmpoila } = useContext(UserContext);



  useEffect(() => { fetchData('offerDePlois', setOfferDeOmpoloiDeuser) }, [CountOfferDeOmpoila]);

  console.log(utilisateur);


  return (
    <div className='profile justify-content-center'>
      <div className='container-md '>
        <CartCleint client={utilisateur} logout={logout} handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
      </div>

      <div className='container-md ss row justify-content-center align-content-center'>
        {OfferDeOmpoloiuser ? (
          OfferDeOmpoloiuser?.map((item, index) => (
            <div className="col-12 mb-3  d-flex justify-content-center" key={index}>
              <CartOfferDeomplio offer={item} user={item.users} name={'Detai'} />
            </div>
          ))
        ) : (
          <div className="text-center" disabled>Loading ...</div>
        )}
      </div>
      <div className='pagination'>
        {/* {OfferDeOmpoloiuser && <Pagination offerDemploi={OfferDeOmpoloiuser} fond = {'client'} />} */}
      </div>

    </div>
  )
}

export default Cleint