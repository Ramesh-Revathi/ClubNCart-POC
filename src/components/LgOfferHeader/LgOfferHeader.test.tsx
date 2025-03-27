import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LgOfferHeader from './LgOfferHeader';

describe('<LgOfferHeader />', () => {
  test('it should mount', () => {
    render(<LgOfferHeader />);

    const lgOfferHeader = screen.getByTestId('LgOfferHeader');

    expect(lgOfferHeader).toBeInTheDocument();
  });
});