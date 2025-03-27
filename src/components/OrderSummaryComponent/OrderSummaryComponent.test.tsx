import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderSummaryComponent from './OrderSummaryComponent';

describe('<OrderSummaryComponent />', () => {
  test('it should mount', () => {
    render(<OrderSummaryComponent />);

    const orderSummaryComponent = screen.getByTestId('OrderSummaryComponent');

    expect(orderSummaryComponent).toBeInTheDocument();
  });
});