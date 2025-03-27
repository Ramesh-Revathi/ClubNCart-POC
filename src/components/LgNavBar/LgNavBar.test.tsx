import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LgNavBar from './LgNavBar';

describe('<LgNavBar />', () => {
  test('it should mount', () => {
    render(<LgNavBar />);

    const lgNavBar = screen.getByTestId('LgNavBar');

    expect(lgNavBar).toBeInTheDocument();
  });
});