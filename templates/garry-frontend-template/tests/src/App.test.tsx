import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

test('renders app title', () => {
  render(<App />);
  expect(screen.getByText(/Garry OCD Boilerplate/i)).toBeInTheDocument();
});
