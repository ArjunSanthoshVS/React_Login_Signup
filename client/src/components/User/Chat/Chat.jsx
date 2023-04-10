import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { allContacts } from '../../../Redux/Features/User/chatSlice';
import Contacts from '../../../Pages/User/Chat/Contacts';
import Welcome from '../../../Pages/User/Chat/Welcome';
import ChatContainer from '../../../Pages/User/Chat/ChatContainer';
import { io } from 'socket.io-client'
const socket = io("http://localhost:5000")

function Chat() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state?.user?.user }))
    const [contacts, setContacts] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined)
    useEffect(() => {
        if (user) {
            const details = async () => {
                const reponse = await dispatch(allContacts(user._id))
                setContacts(reponse.payload)
            }
            details()
        }
    }, [])

    useEffect(() => {
        if (user) {
            socket.emit("add-user", user._id)
        }
    })
    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }
    return (
        <>
            <Container>
                <div className="container">
                    <Contacts currentUser={user} contacts={contacts} changeChat={handleChatChange} />
                    {
                        currentChat === undefined ?
                            <Welcome currentUser={user} /> :
                            <ChatContainer currentChat={currentChat} currentUser={user} socket={socket} />
                    }
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: lightblue;
  .container {
    padding:0;
    height: 85vh;
    width: 85vw;
    background-color: #e3e3e3;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat
