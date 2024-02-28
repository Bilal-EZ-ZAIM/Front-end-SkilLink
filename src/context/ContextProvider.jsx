import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    isLogin();
  }, []);

  const isToken = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // console.log("Token Found:", storedToken);
      return true;
    }
    setLoading(false);
  };

  const isLogin = async () => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const config = {
          headers: {
            Authorization: 'Bearer ' + storedToken ,
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.get('http://127.0.0.1:8000/api/token', config);
        console.log(response.data);
        setUtilisateur(response.data);
        setUserFound(true); 
      } catch (error) {
        console.error('Erreur lors de la requête GET :', error);
      }
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{ utilisateur, setUtilisateur, isLogin, token, isToken, setToken, loading, userFound }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
