'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

export type SpinnerSize = 'small' | 'medium' | 'large';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

const getSizeInPixels = (size: SpinnerSize): number => {
  switch (size) {
    case 'small':
      return 20;
    case 'medium':
      return 30;
    case 'large':
      return 40;
    default:
      return 30;
  }
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#0070f3',
}) => {
  return <Spinner size={size} color={color} />;
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div<{
  size: SpinnerSize;
  color: string;
}>`
  border: ${(props) => Math.max(2, getSizeInPixels(props.size) / 10)}px solid rgba(0, 0, 0, 0.1);
  border-top: ${(props) => Math.max(2, getSizeInPixels(props.size) / 10)}px solid ${(props) => props.color};
  border-radius: 50%;
  width: ${(props) => getSizeInPixels(props.size)}px;
  height: ${(props) => getSizeInPixels(props.size)}px;
  animation: ${spin} 1s linear infinite;
`;

export default LoadingSpinner; 