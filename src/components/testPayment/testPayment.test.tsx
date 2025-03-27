import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import testPayment from './testPayment';

describe('<testPayment />', () => {
  test('it should mount', () => {
    render(<testPayment />);

    const testPayment = screen.getByTestId('testPayment');

    expect(testPayment).toBeInTheDocument();
  });
});