import React from "react";
import Chatlist from "../../components/chatlist/Chatlist";
import { Menu } from '@mui/icons-material'
import './home.css'
import Messenger from "../../components/Messenger/messenger";
import { useState, useContext } from "react";
import AuthContext from '../../Context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Mymenu from "../../components/Mymenu/Mymenu";
import axios from "axios";

export default function Home() {
    const [receiver, setReceiver] = useState(null);
    const { user } = useContext(AuthContext);
    const [mymenu, setPopMymenu] = useState(false)
    const [resUser, setResUser] = useState([])
    const [searchResultPop, setSearchResultPop] = useState(false)
    const [searchChar, setSearchChar] = useState('')
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    function handleClick(_event, param) {
        setReceiver(param);
    }

    async function searchUser(e) {
        e.preventDefault()
        setSearchResultPop(false)
        setSearchResultPop(true)
        setSearchChar(e.target.value)
        if (e.target.value !== "") {
            try {
                const response = await axios.get("/users/all/" + e.target.value)
                setResUser(response.data)
                console.log(resUser)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className="homepage" >
            <div className="leftPart">
                <div className="topPart">
                    {user.profilePicture ?
                        <img src={PF + user.profilePicture} alt="" className="userProfilePicture " /> : <AccountCircleIcon className="userProfilePicture" />}
                    <button className="menu" onClick={
                        () => {
                            if (mymenu === false) setPopMymenu(true)
                            else setPopMymenu(false)
                        }}>
                        <Menu id="menu" /></button>
                    <input type="text"
                        id="searchInput"
                        placeholder="Search person"
                        onChange={(e) => searchUser(e)}
                        value={searchChar}
                    />
                    {mymenu && (
                        <Mymenu />
                    )}
                    {searchResultPop && (
                        <div className="resDiv">
                            <button className="closebtn" onClick={() => {
                                setSearchResultPop(false)
                                setResUser([])
                                setSearchChar('')
                            }}>X</button>
                            {resUser?.map((obj, i) => {
                                if (obj.username !== user.username) {
                                    return (
                                        <button className="foundUser" key={i} onClick={(obj) => {
                                            // console.log(obj._id)
                                            // setReceiver(obj)
                                        }}>
                                            {obj.profilePicture ? <img src={PF + obj.profilePicture} alt="" className="resUserProfilePic" /> : <AccountCircleIcon className="resUserProfilePic" />}
                                            <p className='foundUsername'>{obj.username}</p>
                                        </button>
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
                <Chatlist handleClick={(event, param) => handleClick(event, param)} />
            </div>
            <div className="rightPart">
                <Messenger receiver={receiver} />
            </div>
        </div>
    )
}