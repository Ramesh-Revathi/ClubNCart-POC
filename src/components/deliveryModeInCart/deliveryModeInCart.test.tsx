import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import deliveryModeInCart from './deliveryModeInCart';

describe('<deliveryModeInCart />', () => {
  test('it should mount', () => {
    render(<deliveryModeInCart />);

    const deliveryModeInCart = screen.getByTestId('deliveryModeInCart');

    expect(deliveryModeInCart).toBeInTheDocument();
  });
});