import React from 'react'
import './popbox.css';
import { useState } from 'react';

function Popbox({ handleClick }) {
    const [clearchat, setClearChat] = useState(false)
    const [block, setBlock] = useState(false)

    async function deleteAllMessages(e) {
        handleClick(e, 'deleteAll')
        setClearChat(false)
    }

    async function showStaredMsg(e) {
        handleClick(e, 'showStaredMsg')
    }

    async function blockPerson(e) {
        handleClick(e, 'block')
        setBlock(false)
    }

    async function selectMsg(e) {
        handleClick(e, 'selectMsg')
    }
    return (
        <div className="popbox">
            <ul>
                <button onClick={() => {
                    setClearChat(true)
                }}><li>Clear chats</li></button>
                {clearchat && (
                    <div className="clearChatPop">
                        <p>If you clear this chats then all messages are deleted for both persons.</p>
                        <button className="okbtn" onClick={(e) => deleteAllMessages(e)}>Ok</button>
                        <button className="canclebtn" onClick={() => { setClearChat(false) }}>Cancle</button>
                    </div>
                )}

                <button onClick={() => {
                    setBlock(true)
                }}><li>Block</li></button>
                {block && (
                    <div className="clearChatPop">
                        <p>Do you want to bloack this person? </p>
                        <button className="okbtn" onClick={(e) => { blockPerson(e) }}>Yes</button>
                        <button className="canclebtn" onClick={() => { setBlock(false) }}>No</button>
                    </div>
                )}

                <button onClick={(e) => showStaredMsg(e)}><li>Starred messages</li></button>
                <button onClick={(e) => selectMsg(e)}><li>Select messages</li></button>
            </ul>
        </div>
    )
}

export default Popbox
