import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import addressMapComponent from './addressMapComponent';

describe('<addressMapComponent />', () => {
  test('it should mount', () => {
    render(<addressMapComponent />);

    const addressMapComponent = screen.getByTestId('addressMapComponent');

    expect(addressMapComponent).toBeInTheDocument();
  });
});