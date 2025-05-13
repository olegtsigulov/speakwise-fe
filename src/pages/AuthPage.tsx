import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import { useAuth } from '../features/auth/context/AuthContext';
import SpeakWiseLogo from '../assets/images/logo';

type TabType = 'login' | 'register';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const { isAuthenticated } = useAuth();

  // Redirect to home if user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <AuthCard>
        <LogoContainer>
          <SpeakWiseLogo width={180} />
        </LogoContainer>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </Tab>
          <Tab 
            active={activeTab === 'register'} 
            onClick={() => setActiveTab('register')}
          >
            Create Account
          </Tab>
        </TabContainer>
        
        <FormContainer>
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </FormContainer>
      </AuthCard>
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

const AuthCard = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  background-color: ${props => (props.active ? '#fff' : '#f8fafc')};
  color: ${props => (props.active ? '#3182ce' : '#4a5568')};
  font-weight: ${props => (props.active ? '600' : '500')};
  border: none;
  border-bottom: ${props => (props.active ? '2px solid #3182ce' : 'none')};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => (props.active ? '#fff' : '#f1f5f9')};
  }
`;

const FormContainer = styled.div`
  padding: 1.5rem;
`;

export default AuthPage; 