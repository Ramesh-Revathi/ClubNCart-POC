import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import registerMobileNoPopup from './registerMobileNoPopup';

describe('<registerMobileNoPopup />', () => {
  test('it should mount', () => {
    render(<registerMobileNoPopup />);

    const registerMobileNoPopup = screen.getByTestId('registerMobileNoPopup');

    expect(registerMobileNoPopup).toBeInTheDocument();
  });
});