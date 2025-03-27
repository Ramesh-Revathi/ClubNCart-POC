import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import transactionSummary from './transactionSummary';

describe('<transactionSummary />', () => {
  test('it should mount', () => {
    render(<transactionSummary />);

    const transactionSummary = screen.getByTestId('transactionSummary');

    expect(transactionSummary).toBeInTheDocument();
  });
});