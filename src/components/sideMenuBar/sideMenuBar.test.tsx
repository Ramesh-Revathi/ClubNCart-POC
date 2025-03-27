import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import sideMenuBar from './sideMenuBar';

describe('<sideMenuBar />', () => {
  test('it should mount', () => {
    render(<sideMenuBar />);

    const sideMenuBar = screen.getByTestId('sideMenuBar');

    expect(sideMenuBar).toBeInTheDocument();
  });
});