import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import text from './text';

describe('<text />', () => {
  test('it should mount', () => {
    render(<text />);

    const text = screen.getByTestId('text');

    expect(text).toBeInTheDocument();
  });
});