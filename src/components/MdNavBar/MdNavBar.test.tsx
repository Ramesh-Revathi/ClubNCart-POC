import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MdNavBar from './MdNavBar';

describe('<MdNavBar />', () => {
  test('it should mount', () => {
    render(<MdNavBar />);

    const mdNavBar = screen.getByTestId('MdNavBar');

    expect(mdNavBar).toBeInTheDocument();
  });
});