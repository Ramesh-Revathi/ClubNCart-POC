import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OtpVerification from './OtpVerification';

describe('<OtpVerification />', () => {
  test('it should mount', () => {
    render(<OtpVerification />);

    const otpVerification = screen.getByTestId('OtpVerification');

    expect(otpVerification).toBeInTheDocument();
  });
});