import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeliveryInstructions from './DeliveryInstructions';

describe('<DeliveryInstructions />', () => {
  test('it should mount', () => {
    render(<DeliveryInstructions />);

    const deliveryInstructions = screen.getByTestId('DeliveryInstructions');

    expect(deliveryInstructions).toBeInTheDocument();
  });
});