import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import productListDisplayChild from './productListDisplayChild';

describe('<productListDisplayChild />', () => {
  test('it should mount', () => {
    render(<productListDisplayChild />);

    const productListDisplayChild = screen.getByTestId('productListDisplayChild');

    expect(productListDisplayChild).toBeInTheDocument();
  });
});