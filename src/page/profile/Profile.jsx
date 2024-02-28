import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/ContextProvider';
import './profile.css';

const Profile = () => {
  const { utilisateur } = useContext(UserContext);
  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/images');
        setImgData(response.data.image);
        // alert(response.data[0].image);
        console.log(response.data.image);
      } catch (error) {
        console.error('Error fetching image data:', error);
        setImgData(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile-container">
      <h1>Profil Utilisateur</h1>
      {imgData ? (
        <img src={'http://127.0.0.1:8000/app/public/uploads/'+imgData} alt="User Image" />
      ) : (
        <p>Erreur: Impossible de charger l'image de l'utilisateur.</p>
      )}
      <div className="profile-info">
        {utilisateur.user ? (
          <>
            <p><strong>ID:</strong> {utilisateur.user.id}</p>
            <p><strong>Nom:</strong> {utilisateur.user.nom}</p>
            <p><strong>Prénom:</strong> {utilisateur.user.prenom}</p>
            <p><strong>Email:</strong> {utilisateur.user.email}</p>
            <p><strong>Date de création:</strong> {utilisateur.user.created_at}</p>
            <p><strong>Date de mise à jour:</strong> {utilisateur.user.updated_at}</p>
          </>
        ) : (
          <p>Erreur: Impossible de charger les informations de l'utilisateur.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
