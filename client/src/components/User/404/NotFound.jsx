import React from 'react';
import styled from 'styled-components';

const ErrorPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 6rem;
  margin-bottom: 0;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-top: 0;
`;

const Button = styled.a`
  display: inline-block;
  padding:10px 20px;
  background-color: #054D60;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 2rem;
  transition: all 0.3s ease-in-out;
  cursor:pointer;

  &:hover {
    background-color: whitesmoke;
    color: #054D60;
  }
`;

const NotFound = () => {
  return (
    <ErrorPage>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <p>Oops! Looks like you got lost.</p>
      <Button onClick={() => window.history.go(-1)}>Return to previous page..!</Button>
    </ErrorPage>
  );
};

export default NotFound;