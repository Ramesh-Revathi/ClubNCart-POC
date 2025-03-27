import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import mainHome from './mainHome';

describe('<mainHome />', () => {
  test('it should mount', () => {
    render(<mainHome />);

    const mainHome = screen.getByTestId('mainHome');

    expect(mainHome).toBeInTheDocument();
  });
});