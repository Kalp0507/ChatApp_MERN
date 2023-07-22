import React from 'react'
import axios from 'axios';
import { Add, Send, MoreHoriz } from '@mui/icons-material';
import './Messenger.css'
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popbox from '../popbox/popbox';

function Messenger({ receiver }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [popmore, setPopMore] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [deleteIt, setDeleteIt] = useState(false)
  const [starIt, setStarIt] = useState(false)
  const [msgId, setMsgId] = useState([])
  const [staredMsgPop, setStaredMsgPop] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  const getMessages = async () => {  // getting old messages from backend
    checkBlock();
    if (isBlocked === false) {
      try {
        const res = await axios.get("/message/" + user?._id + "/" + currentChat._id);
        setMessages(res.data.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0)));
      } catch (err) {
        console.log(err);
      }
    }
  };

  // adding new messages
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const message = {
      senderId: user._id,
      msg: newMessage,
      receiverId: currentChat._id
    };
    try {
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  function handleClick(e, param) {
    console.log(param)
    if (param === 'deleteAll') {
      for (let i = 0; i < messages.length; i++) {
        deleteOneMessage(messages[i]._id)
      }
      getMessages();
      setPopMore(false);
    }
    else if (param === 'showStaredMsg') {
      setStaredMsgPop(true)
      getMessages();
      setPopMore(false);
    }
    else if (param === 'block') {
      blockPerson();
      setPopMore(false)
    }
    else if (param === 'selectMsg') {

    }
    else {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
      if (isOpen === false && e.nativeEvent.button === 2) {
        setIsOpen(true)
        setMsgId(param)
      }
      else if (isOpen === true) {
        setIsOpen(false)
      }
    }
  }

  async function deleteOneMessage(msgId) {
    try {
      await axios.delete("/message/" + msgId);
      setDeleteIt(false)
    } catch (err) {
      console.log(err)
    }
  }

  async function starMessage(msgId) {
    try {
      await axios.put("/message/starIt/" + msgId)
    } catch (error) {
      console.log(error)
    }
  }

  async function blockPerson() {
    if (user._id === currentChat._id) {
      alert('You cannot block this chat.')
    } else {
      try {
        await axios.put('/users/block/' + user._id + '/' + currentChat?._id)
        checkBlock();
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function unblockPerson() {
    try {
      await axios.put('/users/unblock/' + user._id + '/' + currentChat?._id)
    } catch (error) {
      console.log(error)
    }
  }

  async function checkBlock() {
    try {
      const res = await axios.get('/users/checkBlock/' + user._id + '/' + currentChat?._id)
      setIsBlocked(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  useEffect(() => { // to save receiver
    setCurrentChat(receiver)
    setPopMore(false)
  }, [receiver]);

  useEffect(() => {
    getMessages(); //to get messages
  }, [currentChat]);

  useEffect(() => {
    function extra() {
      deleteOneMessage(msgId)
    }
    if (deleteIt === true) {
      extra();  //to delete One message
      getMessages();
    }
  }, [deleteIt, msgId]);

  useEffect(() => {
    // make msg starred in backend
    if (starIt === true) {
      starMessage(msgId);
    }
  }, [starIt]);


  return (
    <div className='mainDiv'>
      {/* Top area */}
      <div className="topbar">
        <div className='receiverDetail'>
          {currentChat?.profilePicture ? <img src={PF + currentChat?.profilePicture} alt="" className="receiverProfile" /> : <AccountCircleIcon className='receiverProfile' />}
          {currentChat?.username === user.username ? <p className='receiverName'>Saved Message</p> : <p className='receiverName'>{currentChat?.username}</p>}
        </div>
        <button id="chatSettings" onClick={
          () => {
            if (popmore === false) setPopMore(true)
            else setPopMore(false)
          }}
        ><MoreHoriz /></button>
        {popmore && (
          <Popbox handleClick={(event, param) => handleClick(event, param)} />
        )}
      </div>

      {/* Chats will appear here */}
      <div className="chatarea">
        {currentChat ? <>
          {(isBlocked === false) ? <>
            {(staredMsgPop === false) ? <>
              {(messages.length !== 0) ? <>
                {messages.map((m, i) => {
                  if (m.senderId === user._id) {
                    return (
                      <div className="senderMsg" key={i} onMouseDown={(e, _id) => { handleClick(e, m._id) }}>
                        <p>{m.msg} </p>
                      </div>
                    )
                  }
                  else {
                    return (
                      <div className="receiverMsg" key={i} onMouseDown={(e, _id) => { handleClick(e, m._id) }}>
                        <p> {m.msg} </p>
                      </div>
                    )
                  }
                })}
              </> : <div className='defaultChat'>No Chats Yet</div>}
            </>
              :
              <>
                {(messages.length !== 0) ? <>
                  {messages.map((m, i) => {
                    if (m.isStarred === true) {
                      if (m.senderId === user._id) {
                        return (
                          <div className="senderMsg" key={i} onMouseDown={(e, _id) => { handleClick(e, m._id) }}>
                            <p>{m.msg} </p>
                          </div>
                        )
                      }
                      else {
                        return (
                          <div className="receiverMsg" key={i} onMouseDown={(e, _id) => { handleClick(e, m._id) }}>
                            <p> {m.msg} </p>
                          </div>
                        )
                      }
                    }
                  })}
                </> : <div className='defaultChat'>No Starred Messages</div>}
                <div className="starBottombar">
                  <button className='closeStarbtn' onClick={() => {
                    setStaredMsgPop(false)
                    getMessages();
                  }}>Close</button></div>
              </>
            }
          </> : <>
            <div className="defaultChat">You've blocked this person.</div>
            <div className="starBottombar">
              <button className='closeStarbtn' onClick={() => {
                unblockPerson();
                getMessages();
              }}>Unblock</button></div>
          </>}
        </> : <div className="defaultChat">Select Chat</div>}
      </div>

      {/* Popup when messages are clicked */}
      {isOpen && (
        <div className="msgpop">
          <button className='msgpopbtn' onClick={() => {
            setDeleteIt(true)
            setIsOpen(false)
          }}>Delete it</button>
          <button className='msgpopbtn' onClick={() => {
            setStarIt(true)
            setIsOpen(false)
          }}>Star it</button>
        </div>
      )}

      {/* bottom area */}
      <div className="bottombar">
        <button id='expandMenu'><Add /></button>
        <input type="text"
          placeholder='type your message...'
          id='chatInput'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          onKeyDown={handleKeyDown} />
        <button id='sendbtn' onClick={handleSubmit}><Send /></button>
      </div>
    </div>
  )
}

export default Messenger
