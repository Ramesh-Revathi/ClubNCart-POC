import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import paymentModeComponent from './paymentModeComponent';

describe('<paymentModeComponent />', () => {
  test('it should mount', () => {
    render(<paymentModeComponent />);

    const paymentModeComponent = screen.getByTestId('paymentModeComponent');

    expect(paymentModeComponent).toBeInTheDocument();
  });
});