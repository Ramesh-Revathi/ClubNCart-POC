import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import shopingCartComponent from './shopingCartComponent';

describe('<shopingCartComponent />', () => {
  test('it should mount', () => {
    render(<shopingCartComponent />);

    const shopingCartComponent = screen.getByTestId('shopingCartComponent');

    expect(shopingCartComponent).toBeInTheDocument();
  });
});