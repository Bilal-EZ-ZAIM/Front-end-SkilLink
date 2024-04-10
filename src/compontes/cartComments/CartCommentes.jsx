import React from 'react'
import './CartCommentes.css'
const CartCommentes = ({developer ,image , commantes , author} ) => {
  console.log("fvvv" + commantes);
  return (
    <div className='cart_commaints'>
       <div className='image_cart'>
        <img src={image} />
       </div>
       <div className='infou_comments_user'>
        <h5> <strong> {author} </strong></h5>

        <p> {developer} </p>

        <p> {commantes} </p>
       </div>

    </div>
  )
}

export default CartCommentes