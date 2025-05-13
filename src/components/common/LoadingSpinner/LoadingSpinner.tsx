import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const getSizeInPixels = (size: string): number => {
  switch (size) {
    case 'small':
      return 16;
    case 'medium':
      return 32;
    case 'large':
      return 48;
    default:
      return 32;
  }
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface SpinnerStyleProps {
  $sizeInPx: number;
}

const SpinnerContainer = styled.div<SpinnerStyleProps>`
  width: ${(props) => props.$sizeInPx}px;
  height: ${(props) => props.$sizeInPx}px;
  border: ${(props) => Math.max(2, props.$sizeInPx / 8)}px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3182ce;
  animation: ${rotate} 1s ease-in-out infinite;
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeInPx = getSizeInPixels(size);
  
  return <SpinnerContainer $sizeInPx={sizeInPx} data-testid="loading-spinner" />;
};

export default LoadingSpinner; 