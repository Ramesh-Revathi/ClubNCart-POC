import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import otpComponent from './otpComponent';

describe('<otpComponent />', () => {
  test('it should mount', () => {
    render(<otpComponent />);

    const otpComponent = screen.getByTestId('otpComponent');

    expect(otpComponent).toBeInTheDocument();
  });
});