import React, { useContext, useEffect, useState } from 'react';
import './messager.css';
import Chat from '../../compontes/chat/Chat';
import axios from 'axios';
import { UserContext } from '../../context/ContextProvider';

const Messager = () => {
    const [name, setname] = useState(1);
    const [RommChate, setRommChate] = useState();
    const [nom, setnom] = useState();
    const [image, setimage] = useState()
    const [Messages, setMessages] = useState();
   
    const [addClass , setaddClass] = useState(1);
    const {
        utilisateur, idMessageUser, setidMessageUser , newMessage, setnewMessage, sendMessage ,getMessage, setgetMessage
    } = useContext(UserContext);


    const handleChangeAddClass = () => {
        setaddClass(1);
    }



    const handelclick = (name, Id, Image) => {
        setname(pre => pre + 1);
        setnom(name);
        setidMessageUser(Id);
        setimage(Image);
        setaddClass(0);
    }

    const fetchData = async (endPoint, storyData) => {
        const storedToken = localStorage.getItem('token');

        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + storedToken,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get(endPoint, config);

            if (response.status === 200) {
                setnom(response.data[0].nom);
                setidMessageUser(response.data[0].id);
                storyData(response.data);
                setimage(response.data[0].image)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataa = async (endPoint, storyData) => {
        const storedToken = localStorage.getItem('token');

        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + storedToken,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get(endPoint, config);

            if (response.status === 200) {
                storyData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    

    useEffect(() => {
        fetchData("http://127.0.0.1:8000/api/chatRome", setRommChate);
    }, []);

    useEffect(() => {
        fetchDataa("http://127.0.0.1:8000/api/messages/" + idMessageUser, setMessages);
    }, [idMessageUser , getMessage]);

    console.log(Messages);

    return (
        <div className='container-md'>
            <div className="content mt-5 mb-5" >
                <div className={addClass === 0 ? 'chatRoom meesa' : 'chatRoom'}>
                    <div className='heading'>
                        <input type="text" placeholder='search' />
                    </div>
                    <div className='body_rome'>
                        {
                            RommChate && RommChate.map((item, index) => (
                                <button onClick={() => handelclick(item?.nom, item?.id, item?.image)} key={index}> <Chat user={item} /></button>
                            ))
                        }
                    </div>
                </div>
                <div className={addClass === 1 ?'meesager meesa' : 'meesager'}>
                    <div className='messager_header'>
                        {
                            image ? <img src={image} alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                        }
                        <h5> {nom} </h5>
                        <button type="button" onClick={handleChangeAddClass}  className="btn btn-secondary returns"> <i class="bi bi-arrow-left-circle-fill"></i>  </button>
                    </div>
                    <div className='convocation'>
                        {Messages && Messages.map((message, index) => (
                            <div key={index} className={message.user_sender === utilisateur?.id ? 'userSender userMessager' : 'userReceiver userMessager'}>
                                {
                                    message.user_sender === utilisateur?.id ?
                                        (
                                            utilisateur?.image ?
                                                <img src={utilisateur?.image} alt="" /> :
                                                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                                        ) :
                                        (
                                            image ?
                                                <>
                                                    <img src={image} alt="" />
                                                </> : <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                                        )
                                }
                                <p>{message.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className='footer'> 
                        <input placeholder='Ecrire Messager' type="text" value={newMessage} onChange={(e)=> setnewMessage(e.target.value)} />
                        <button className='btn btn-secondary' type='submit' onClick={sendMessage}> <i  class="bi bi-send"></i> </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messager;
