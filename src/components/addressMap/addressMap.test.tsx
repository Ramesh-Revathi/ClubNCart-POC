import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import addressMap from './addressMap';

describe('<addressMap />', () => {
  test('it should mount', () => {
    render(<addressMap />);

    const addressMap = screen.getByTestId('addressMap');

    expect(addressMap).toBeInTheDocument();
  });
});