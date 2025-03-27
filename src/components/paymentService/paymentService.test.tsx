import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import paymentService from './paymentService';

describe('<paymentService />', () => {
  test('it should mount', () => {
    render(<paymentService />);

    const paymentService = screen.getByTestId('paymentService');

    expect(paymentService).toBeInTheDocument();
  });
});