import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewCartAtBottom from './ViewCartAtBottom';

describe('<ViewCartAtBottom />', () => {
  test('it should mount', () => {
    render(<ViewCartAtBottom />);

    const viewCartAtBottom = screen.getByTestId('ViewCartAtBottom');

    expect(viewCartAtBottom).toBeInTheDocument();
  });
});