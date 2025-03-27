import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductListDisplay from './ProductListDisplay';

describe('<ProductListDisplay />', () => {
  test('it should mount', () => {
    render(<ProductListDisplay />);

    const productListDisplay = screen.getByTestId('ProductListDisplay');

    expect(productListDisplay).toBeInTheDocument();
  });
});