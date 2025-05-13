import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../features/auth/context/AuthContext';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Container>
      <Card>
        <Title>Welcome to SpeakWise</Title>
        
        <UserInfo>
          {user && (
            <>
              <InfoLabel>Email:</InfoLabel>
              <InfoValue>{user.email}</InfoValue>
            </>
          )}
        </UserInfo>
        
        <LogoutButton onClick={logout}>
          Logout
        </LogoutButton>
      </Card>
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

const Card = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  text-align: center;
`;

const UserInfo = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
`;

const InfoLabel = styled.p`
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.p`
  color: #2d3748;
  margin-bottom: 1rem;
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c53030;
  }
`;

export default HomePage; 