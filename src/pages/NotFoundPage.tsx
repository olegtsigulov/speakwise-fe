import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <StatusCode>404</StatusCode>
        <Title>Page Not Found</Title>
        <Description>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Description>
        <HomeLink to="/">Go to Homepage</HomeLink>
      </Content>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f7fafc;
`;

const Content = styled.div`
  text-align: center;
  max-width: 500px;
`;

const StatusCode = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  color: #3182ce;
  line-height: 1;
  margin: 0;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin: 1rem 0;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3182ce;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2b6cb0;
  }
`;

export default NotFoundPage; 