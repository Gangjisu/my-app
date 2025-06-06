import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search header', () => {
  render(<App />);
  const headerElement = screen.getByText(/이터널 리턴 전적 검색/i);
  expect(headerElement).toBeInTheDocument();
});
