import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MdMenuBar from './MdMenuBar';

describe('<MdMenuBar />', () => {
  test('it should mount', () => {
    render(<MdMenuBar />);

    const mdMenuBar = screen.getByTestId('MdMenuBar');

    expect(mdMenuBar).toBeInTheDocument();
  });
});