import React, { useContext, useState } from 'react'
import './Mymenu.css'
import AuthContext from '../../Context/AuthContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

function Mymenu() {
    const [popProfile, setPopProfile] = useState(true)
    const [popAccount, setPopAccount] = useState(false)
    const [popOther, setPopOther] = useState(false)
    const [blockPop, setBlockPop] = useState(false)
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [bArray, SetbArray] = useState([]);

    async function getBLockPerson() {
        try {
            let res = [];
            for (let i = 0; i < user.blockArray.length; i++) {
                res.push((await axios.get('/users/' + user.blockArray[i])).data[0]);
            }
            SetbArray(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='box'>
            <div className="leftPannel">
                <ul>
                    <button onClick={() => {
                        setPopProfile(true)
                        setPopAccount(false)
                        setPopOther(false)
                    }}><li>Profile</li></button>
                    <button onClick={() => {
                        setPopProfile(false)
                        setPopAccount(true)
                        setPopOther(false)
                    }}><li>Account</li></button>
                    <button onClick={() => {
                        setPopProfile(false)
                        setPopAccount(false)
                        setPopOther(true)
                    }}><li>Other</li></button>
                </ul>
            </div>

            <div className="detailPannel">
                {popProfile && (
                    <div className='Profile'>
                        {user.profilePicture ?
                            <img src={PF + user.profilePicture} alt='' className="ProfilePicture" />
                            : <AccountCircleIcon className="ProfilePicture" />}
                        <div className="usernameDiv">
                            <p className='heading'>username:</p>
                            <p className='username'>{user.username}</p>
                        </div>
                    </div>
                )}
                {popAccount && (
                    <div className='Account'>Account</div>
                )}
                {popOther && (
                    <div className='Other'>
                        <button className='seeBlockedBtn' onClick={() => {
                            getBLockPerson();
                            if (blockPop === false) {
                                setBlockPop(true)
                            } else {
                                setBlockPop(false)
                            }
                        }}>Blocked Persons</button>
                    </div>
                )}
                {blockPop && (
                    <div className="blockList">
                        {(bArray !== null) ? <>
                            {bArray.map((obj, index) => {
                                return (
                                    <div className="listDiv" key={index}>
                                        {obj.username}
                                    </div>
                                )
                            })}
                        </> : <div className="empty">No blocked person</div>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Mymenu
