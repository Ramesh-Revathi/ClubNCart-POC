import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import viewOrderComponent from './viewOrderComponent';

describe('<viewOrderComponent />', () => {
  test('it should mount', () => {
    render(<viewOrderComponent />);

    const viewOrderComponent = screen.getByTestId('viewOrderComponent');

    expect(viewOrderComponent).toBeInTheDocument();
  });
});