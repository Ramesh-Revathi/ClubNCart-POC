import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RefundPolicy from './RefundPolicy';

describe('<RefundPolicy />', () => {
  test('it should mount', () => {
    render(<RefundPolicy />);

    const refundPolicy = screen.getByTestId('RefundPolicy');

    expect(refundPolicy).toBeInTheDocument();
  });
});