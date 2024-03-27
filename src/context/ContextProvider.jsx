import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const api = "http://127.0.0.1:8000/api/";
  const [IdSkills, setIdSkills] = useState(0);
  const [skills, setSkills] = useState();
  const [utilisateur, setUtilisateur] = useState();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [userFound , setUserFound] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [TypeUtilisateur, setTypeUtilisateur] = useState(null);
  const [Competons, setCompetons] = useState([]);
  const [Developer, setDeveloper] = useState();
  const [error, setError] = useState(null);
  const [Comantear, setComantear] = useState([]);
  const [Project, setProject] = useState();
  const [Educations, setEducation] = useState();


  const isToken = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
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
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.get('http://127.0.0.1:8000/api/token', config);
        
        setUtilisateur(response.data.user);
        setIsAuthenticated(true);
        setUserFound(true);
        setTypeUtilisateur(response.data.user.role_id);
      } catch (error) {
        console.error('Erreur lors de la requête GET :', error);
      }
      return true;
    }
    return false;
  };

  useEffect(() => {
    isLogin();
  }, []);







  const fetchData = async (endPoint, storyData) => {

    const storedToken = localStorage.getItem('token');

    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + storedToken,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.get(api + endPoint, config);
      storyData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => { fetchData('DeveloperType', setDeveloper) }, []);
  useEffect(() => { fetchData('get/competonce', setSkills) }, [IdSkills]);
  useEffect(() => { fetchData('getAll/commpetonce', setCompetons) }, [IdSkills]);
  useEffect(() => { fetchData('profile/commentaires', setComantear) }, []);
  useEffect(() => { fetchData('project', setProject) }, [IdSkills]);
  useEffect(() => { fetchData('get/education', setEducation) }, [IdSkills]);


  return (
    <UserContext.Provider value={{
      Educations,
      Comantear, api,
      IdSkills, setIdSkills,
      skills, isAuthenticated,
      setIsAuthenticated, utilisateur,
      setUtilisateur, isLogin,
      token, isToken, setToken,
      loading, userFound,
      Competons, Developer ,
      setProject ,Project,
      setTypeUtilisateur,
      TypeUtilisateur
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
