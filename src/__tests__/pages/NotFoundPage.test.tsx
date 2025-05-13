import React from 'react';
import { render, screen } from '../test-utils';
import NotFoundPage from '../../pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('should render 404 error message', () => {
    render(<NotFoundPage />);
    
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
  
  it('should have a link to return to homepage', () => {
    render(<NotFoundPage />);
    
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
  });
}); 