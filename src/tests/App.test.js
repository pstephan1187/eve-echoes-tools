import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders ores link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Ores/i);
  expect(linkElement).toBeInTheDocument();
});
