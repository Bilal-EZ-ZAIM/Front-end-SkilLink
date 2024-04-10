import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UserContext = createContext();

const ContextProvider = ({ children }) => {

  const api = "http://127.0.0.1:8000/api/";
  const [IdSkills, setIdSkills] = useState(0);
  const [utilisateur, setUtilisateur] = useState();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [userFound, setUserFound] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [TypeUtilisateur, setTypeUtilisateur] = useState(null);
  const [Competons, setCompetons] = useState([]);
  const [Developer, setDeveloper] = useState();
  const [error, setError] = useState(null);
  const [Educations, setEducation] = useState();
  const [page, setpage] = useState(1);
  const [pageC, setpageC] = useState(5);
  const [OfferDeOmpoloi, setOfferDeOmpoloi] = useState();
  const [OfferDeOmpoloiuser, setOfferDeOmpoloiDeuser] = useState();
  const storedToken = localStorage.getItem('token');
  const [selectedFile, setSelectedFile] = useState(null);
  const [details, setdetails] = useState();
  const [id, setid] = useState(1);
  const [IdP, setIdP] = useState();
  const [idF, setIdF] = useState();
  const [datelsFreelancer, setdatelsFreelancer] = useState();
  const [RommChate, setRommChate] = useState();
  const [IdProject, setIdProject] = useState()
  const [Comantear, setComantear] = useState();
  const [Skills, setSkills] = useState();
  const [Project, setProject] = useState();
  const [freelancers, setfreelancer] = useState();
  const [CountOfferDeOmpoila, setCountOfferDeOmpoila] = useState();
  const [CountEdicatio, setCountEdicatio] = useState();
  const [datelsFreelancers, setdatelsFreelancers] = useState();
  const [skillsDitalis, setskillsDitalis] = useState();
  const [projectDetails, setprojectDetails] = useState();
  const [commanterDatilse, setcommanterDatiles] = useState();
  const [educationsFrrelancer, seteducationsFrrelancer] = useState();
  const [idMessageUser, setidMessageUser] = useState();
  const [newMessage, setnewMessage] = useState();
  const [getMessage, setgetMessage] = useState(1);
  const [nomTypeDeveloper, setnomTypeDeveloper] = useState();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();



    const formData = new FormData();
    formData.append('image', selectedFile);

    console.log(formData);
    const token = localStorage.getItem('token');


    try {
      const response = await axios.post(api + 'upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      Swal.fire({
        title: 'Succès!',
        text: response.data.message,
        icon: 'success',
        customClass: {
          background: 'green',
        }
      });

      isLogin();
    } catch (error) {
      console.log(error);
      console.error(error.response.data.errors.image[0]);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.errors.image[0],
        icon: 'error',
        customClass: {
          background: 'red',
        }
      })
    }
  };

  const isToken = () => {

    if (storedToken) {
      setToken(storedToken);
      return true;
    }
    setLoading(false);
  };


  const logout = async () => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const config = {
          headers: {
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.get('http://127.0.0.1:8000/api/logout', config);
        localStorage.removeItem('token');
        if (response.status === 200) {
          setTypeUtilisateur(null);

          setUtilisateur("");
          setIsAuthenticated(false);
          // Navigaet('/login');
        }

      } catch (error) {
        console.error('Erreur lors de la requête GET :', error);
      }
      return true;
    }

  }


  const isLogin = async () => {


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
  const getOfferDeOmoloi = async (endPoint, storyData) => {
    try {
      const response = await axios.get(api + endPoint);
      storyData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  

 

  console.log(TypeUtilisateur);

  useEffect(() => {
    if (storedToken) {
      fetchData('detaieOffer/' + id, setdetails);
    }
  }, [id]);

  const sendMessage = async () => {
    const storedToken = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + storedToken,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post('http://127.0.0.1:8000/api/ajouterMessager', {
        user_receiver: idMessageUser,
        content: newMessage
      }, config);

      console.log(response);
      if (response.status === 201) {
        setnewMessage(' ');

        setgetMessage(pre => pre + 1);

        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlSumeMessage = async (event) => {
    event.preventDefault();
    const sen = await sendMessage();
    console.log(sen.status);
    if (sen.status === 201) {
      console.log("Données enregistrées avec succès !");
      setnewMessage("");


      Swal.fire({
        title: 'Succès!',
        text: sen.data.message,
        icon: 'success',
        customClass: {
          background: 'green',
        }
      });

    }
  }


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     getOfferDeOmoloi('DeveloperType', setDeveloper);
  //     getOfferDeOmoloi('get/competonce', setSkills);
  //     getOfferDeOmoloi('getAll/commpetonce', setCompetons);
  //     getOfferDeOmoloi('profile/commentaires', setComantear);
  //     getOfferDeOmoloi('project', setProject);
  //     getOfferDeOmoloi('get/education', setEducation);
  //     getOfferDeOmoloi('frrelancer/', idF, setdatelsFreelancer);
  //     getOfferDeOmoloi('messager', setRommChate);
  //   }

  // }, []);





  useEffect(() => { getOfferDeOmoloi('getOfferDePlois?page=' + page, setOfferDeOmpoloi) }, [page, CountOfferDeOmpoila]);

  return (
    <UserContext.Provider value={{
      Educations,
      Comantear, setComantear, api,
      IdSkills, setIdSkills,
      isAuthenticated,
      setIsAuthenticated, utilisateur,
      setUtilisateur, isLogin,
      token, isToken, setToken,
      loading, userFound,
      Competons, Developer,
      setProject, Project,
      setTypeUtilisateur, isLogin,
      TypeUtilisateur,
      OfferDeOmpoloi,
      setOfferDeOmpoloi,
      getOfferDeOmoloi,
      isLogin, setid, setIdF, datelsFreelancer,
      setUserFound, details,
      setpage, setpageC, fetchData, IdP, setIdP,
      logout, handleSubmit, handleFileChange, OfferDeOmpoloiuser,
      IdProject, setIdProject,
      Project, setProject,
      Skills, setSkills, newMessage, setnewMessage,
      setEducation, Educations,
      CountEdicatio, setCountEdicatio,
      CountOfferDeOmpoila, setCountOfferDeOmpoila,
      OfferDeOmpoloiuser, setOfferDeOmpoloiDeuser,
      freelancers, setfreelancer, setCompetons,
      details, setdetails, idMessageUser, setidMessageUser,
      datelsFreelancers, setdatelsFreelancers,
      skillsDitalis, setskillsDitalis, projectDetails, setprojectDetails,
      commanterDatilse, setcommanterDatiles, educationsFrrelancer, seteducationsFrrelancer,
      sendMessage, getMessage, setgetMessage, handlSumeMessage,
      nomTypeDeveloper, setnomTypeDeveloper , setDeveloper

    }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
