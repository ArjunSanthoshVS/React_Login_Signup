import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


function Contacts({ currentUser, contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)
  useEffect(() => {
    if (currentUser) {
      const userName = currentUser.firstName + " " + currentUser.lastName
      setCurrentUserImage(currentUser.image)
      setCurrentUserName(userName)
    }
  }, [currentUser])
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src="/images/red wings logo.png" alt="Logo" />
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={contact.image}
                      alt="Avatar"
                    />
                  </div>
                  <div className="username">
                    <p className='mb-0'>{contact.firstName + " " + contact.lastName}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={currentUserImage}
                alt="Avatar"
              />
            </div>
            <div className="username">
              <p className='mb-0'>{currentUserName}</p>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}
const Container = styled.div`
  display: grid;
grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  background-color: #054D60;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    p {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.3s ease-in-out;
          font-weight: bold;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        p {
          color: white;
        }
      }
    }
    .selected {
      background-color: #129bc0c7;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      p {
       font-weight: bold;
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        p {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts
