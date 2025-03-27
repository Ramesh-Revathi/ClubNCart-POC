import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import productSearchComponent from './productSearchComponent';

describe('<productSearchComponent />', () => {
  test('it should mount', () => {
    render(<productSearchComponent />);

    const productSearchComponent = screen.getByTestId('productSearchComponent');

    expect(productSearchComponent).toBeInTheDocument();
  });
});