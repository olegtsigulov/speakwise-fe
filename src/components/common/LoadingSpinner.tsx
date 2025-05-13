import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#3182ce',
}) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} color={color} />
    </SpinnerContainer>
  );
};

// Keyframes for the spinner animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Sized dimensions for the spinner
const sizeMap = {
  small: '1.5rem',
  medium: '2.5rem',
  large: '3.5rem',
};

// Styled components
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Spinner = styled.div<{ size: 'small' | 'medium' | 'large'; color: string }>`
  width: ${props => sizeMap[props.size]};
  height: ${props => sizeMap[props.size]};
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${props => props.color};
  animation: ${spin} 0.8s linear infinite;
`;

export default LoadingSpinner; 