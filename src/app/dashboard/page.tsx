'use client';

import React from 'react';
import styled from 'styled-components';
import { useAuth } from '@/features/auth/context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  
  return (
    <DashboardContainer>
      <Header>
        <Logo>SpeakWise</Logo>
        <UserSection>
          <UserEmail>{user?.email}</UserEmail>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </UserSection>
      </Header>
      
      <Content>
        <WelcomeSection>
          <h1>Welcome to SpeakWise Dashboard</h1>
          <p>Your intelligent conversation platform</p>
        </WelcomeSection>
        
        <DashboardGrid>
          <DashboardCard>
            <CardTitle>Recent Conversations</CardTitle>
            <CardContent>
              <p>No recent conversations</p>
            </CardContent>
          </DashboardCard>
          
          <DashboardCard>
            <CardTitle>Analytics</CardTitle>
            <CardContent>
              <p>No analytics data available</p>
            </CardContent>
          </DashboardCard>
          
          <DashboardCard>
            <CardTitle>Quick Actions</CardTitle>
            <CardContent>
              <ActionButton>Start New Conversation</ActionButton>
              <ActionButton>View Reports</ActionButton>
            </CardContent>
          </DashboardCard>
        </DashboardGrid>
      </Content>
    </DashboardContainer>
  );
}

// Styles
const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0070f3;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserEmail = styled.span`
  font-size: 0.875rem;
  color: #555;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #0070f3;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.main`
  padding: 2rem;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const DashboardCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CardTitle = styled.div`
  padding: 1rem;
  font-weight: 600;
  border-bottom: 1px solid #eee;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  p {
    color: #666;
    font-size: 0.875rem;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background-color: #f1f5f9;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  text-align: left;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e5e7eb;
  }
`; 