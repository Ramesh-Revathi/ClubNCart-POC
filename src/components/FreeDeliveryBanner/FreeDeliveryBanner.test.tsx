import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FreeDeliveryBanner from './FreeDeliveryBanner';

describe('<FreeDeliveryBanner />', () => {
  test('it should mount', () => {
    render(<FreeDeliveryBanner />);

    const freeDeliveryBanner = screen.getByTestId('FreeDeliveryBanner');

    expect(freeDeliveryBanner).toBeInTheDocument();
  });
});