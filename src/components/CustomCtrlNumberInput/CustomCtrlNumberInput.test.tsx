import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomCtrlNumberInput from './CustomCtrlNumberInput';

describe('<CustomCtrlNumberInput />', () => {
  test('it should mount', () => {
    render(<CustomCtrlNumberInput />);

    const customCtrlNumberInput = screen.getByTestId('CustomCtrlNumberInput');

    expect(customCtrlNumberInput).toBeInTheDocument();
  });
});