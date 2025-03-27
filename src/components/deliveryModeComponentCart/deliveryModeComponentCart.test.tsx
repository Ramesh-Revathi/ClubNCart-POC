import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import deliveryModeComponentCart from './deliveryModeComponentCart';

describe('<deliveryModeComponentCart />', () => {
  test('it should mount', () => {
    render(<deliveryModeComponentCart />);

    const deliveryModeComponentCart = screen.getByTestId('deliveryModeComponentCart');

    expect(deliveryModeComponentCart).toBeInTheDocument();
  });
});