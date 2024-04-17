import React from 'react';
import './chat.css'; // Importez votre fichier CSS pour définir les styles personnalisés

const Chat = (user) => {



    return (
        <div className="chatRoooms">

            {
                user?.user?.image ? <img src={user.user?.image} alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
            }
            <h5> {user?.user.nom} </h5>
        </div>
    );
}

export default Chat;
