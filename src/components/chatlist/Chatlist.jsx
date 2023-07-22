import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './chatlist.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthContext from '../../Context/AuthContext';

function Chatlist({ handleClick }) {
    const [chats, setChats] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);

    function wrapHandleClick(event, params) {
        handleClick(event, params);
    }

    async function getChatlist() {
        await axios.get('/users/all/$')
            .then((res) => {
                setChats(res.data)
            }).catch((e) => {
                console.log(e)
            })
    }
    useEffect(() => {
        getChatlist();
    }, [])

    return (
        <div className='chats'>
            {chats.map((dataobj, index) => {
                return (
                    <button className="personbtn" key={index} onClick={event => wrapHandleClick(event, dataobj)}>
                        {dataobj.profilePicture ? <img src={PF + dataobj.profilePicture} alt="" className="personProfilePic" /> : <AccountCircleIcon />}
                        {dataobj.username === user.username ? <p className='personName'>Saved Message</p> : <p className='personName'>{dataobj.username}</p>}
                    </button>
                );
            })}
        </div>
    )
}

export default Chatlist
